/* --- src/core-engine/components/model/Model.tsx --- */
'use client';
import { useEffect, useState, useRef } from 'react';
import { useThree, ThreeEvent } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { configureGLTFLoader } from '@/core-engine/core/loaders';
import { MockStreamService } from '@/infrastructure/services/MockStreamService';
import { useViewerStore } from '@/core-engine/store/use-viewer';

export const Model = ({ url }: { url: string }) => {
  const gl = useThree((state) => state.gl);
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const { setSelectedMesh, setSceneHierarchy, setLoadingProgress, setStreamStatus } = useViewerStore();
  
  const accumulator = useRef<Uint8Array>(new Uint8Array(0));
  const lastParsedSize = useRef(0);

  useEffect(() => {
    let isMounted = true;
    async function streamAndRefine() {
      for await (const chunk of MockStreamService.stream(url, setLoadingProgress)) {
        if (!isMounted) break;
        const next = new Uint8Array(accumulator.current.length + chunk.length);
        next.set(accumulator.current);
        next.set(chunk, accumulator.current.length);
        accumulator.current = next;

        if (accumulator.current.length - lastParsedSize.current > 524288) { 
          updateMesh(accumulator.current.buffer as ArrayBuffer);
          lastParsedSize.current = accumulator.current.length;
        }
      }
      if (isMounted) updateMesh(accumulator.current.buffer as ArrayBuffer, true);
    }

    function updateMesh(buffer: ArrayBuffer, isFinal = false) {
      const loader = new GLTFLoader();
      configureGLTFLoader(gl as THREE.WebGLRenderer)(loader);
      loader.parse(buffer, '', (gltf) => {
        if (!isMounted) return;
        if (isFinal) {
          const names: string[] = [];
          gltf.scene.traverse(c => { if (c instanceof THREE.Mesh) names.push(c.name); });
          setSceneHierarchy(names);
          setStreamStatus('Ready');
        }
        setScene(gltf.scene);
      });
    }

    streamAndRefine();
    return () => { isMounted = false; };
  }, [url, gl, setLoadingProgress, setSceneHierarchy, setStreamStatus]);

  return scene ? (
    /* 🆕 Change: Remove 'top', add 'position' to move it down */
    <Center position={[0, 0, 0]}> 
    <primitive 
      object={scene} 
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setSelectedMesh(e.object.name);
      }}
    />
  </Center>
  ) : null;
};