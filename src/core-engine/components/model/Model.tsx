'use client';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useViewerStore } from '@/core-engine/store/use-viewer';
import { centerModel } from '@/core-engine/core/scene-math';

export const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const wireframe = useViewerStore((state) => state.wireframe);

  useEffect(() => {
    if (scene) centerModel(scene);
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (mesh.material) {
           (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      }
    });
  }, [wireframe, scene]);

  return <primitive object={scene} />;
};