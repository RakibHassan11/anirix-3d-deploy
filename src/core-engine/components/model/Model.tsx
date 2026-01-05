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
  
  const { 
    setSelectedMesh, 
    setSceneHierarchy, 
    setLoadingProgress, 
    setStreamStatus,
    setStats,         
    hiddenMeshes      
  } = useViewerStore();
  
  const accumulator = useRef<Uint8Array>(new Uint8Array(0));
  const lastParsedSize = useRef(0);

  // 1. SYNC VISIBILITY (Shadow properties removed from here)
  useEffect(() => {
    if (scene) {
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          // Visibility Logic
          obj.visible = !hiddenMeshes.includes(obj.name);

          // 🚀 Ensure mesh does NOT cast or receive shadows
          obj.castShadow = false;
          obj.receiveShadow = false;
        }
      });
    }
  }, [scene, hiddenMeshes]);

  useEffect(() => {
    let isMounted = true;

    async function streamAndRefine() {
      for await (const chunk of MockStreamService.stream(url, setLoadingProgress)) {
        if (!isMounted) break;
        
        const next = new Uint8Array(accumulator.current.length + chunk.length);
        next.set(accumulator.current);
        next.set(chunk, accumulator.current.length);
        accumulator.current = next;

        if (accumulator.current.length - lastParsedSize.current > 1048576) { 
          updateMesh(accumulator.current.slice().buffer, false);
          lastParsedSize.current = accumulator.current.length;
        }
      }
      if (isMounted) updateMesh(accumulator.current.slice().buffer, true);
    }

    function updateMesh(buffer: ArrayBuffer, isFinal = false) {
      const loader = new GLTFLoader();
      configureGLTFLoader(gl as THREE.WebGLRenderer)(loader);

      loader.parse(buffer, '', (gltf) => {
        if (!isMounted) return;

        // 🚀 Ensure shadows are disabled immediately upon parsing chunks
        gltf.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = false;
            obj.receiveShadow = false;
          }
        });

        if (isFinal) {
          const names: string[] = [];
          let totalTriangles = 0;
          let totalVertices = 0;

          gltf.scene.traverse(c => { 
            if (c instanceof THREE.Mesh) {
              names.push(c.name);
              const geom = c.geometry;
              totalVertices += geom.attributes.position.count;
              if (geom.index) {
                totalTriangles += geom.index.count / 3;
              } else {
                totalTriangles += geom.attributes.position.count / 3;
              }
            }
          });

          setSceneHierarchy(names);
          setStats(Math.round(totalTriangles), Math.round(totalVertices));
          setStreamStatus('Ready');
        }
        
        setScene(gltf.scene);
      }, (error) => {
        if (isFinal) console.error("Final model parsing failed:", error);
      });
    }

    streamAndRefine();
    return () => { isMounted = false; };
  }, [url, gl, setLoadingProgress, setSceneHierarchy, setStreamStatus, setStats]);

  return scene ? (
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