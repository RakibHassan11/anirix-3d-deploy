'use client';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useViewerStore } from '@/core-engine/store/use-viewer';
import { centerModel } from '@/core-engine/core/scene-math';
import { configureGLTFLoader } from '@/core-engine/core/loaders';

export const Model = ({ url }: { url: string }) => {
  const gl = useThree((state) => state.gl);
  
  const { scene } = useGLTF(url, true, true, (loader) => {
    // 1. Initialize the streaming configuration
    const setup = configureGLTFLoader(gl as THREE.WebGLRenderer);
    
    // 2. Use 'unknown' or 'any' intermediate cast to bypass type overlap errors
    setup(loader as unknown as GLTFLoader); 
  });

  const wireframe = useViewerStore((state) => state.wireframe);

  useEffect(() => {
    if (scene) {
      centerModel(scene);
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          if (mesh.material) {
             (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframe;
          }
        }
      });
    }
  }, [wireframe, scene]);

  return <primitive object={scene} />;
};