/* --- src/presentation/ui/inspector/SceneTree.tsx --- */
'use client';
import React from 'react';
import * as THREE from 'three';
import { useViewerStore } from '@/core-engine/store/use-viewer';

interface SceneTreeProps {
  scene: THREE.Group | THREE.Object3D | null;
}

export const SceneTree = ({ scene }: SceneTreeProps) => {
  const { selectedMesh, setSelectedMesh } = useViewerStore();
  
  // Define meshes as an array of THREE.Mesh instead of any[]
  const meshes: THREE.Mesh[] = [];

  // Traverse the scene and safely push only meshes
  scene?.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      meshes.push(obj as THREE.Mesh);
    }
  });

  return (
    <div className="p-4">
      <h4 className="text-[10px] font-bold text-zinc-600 mb-2 uppercase">Hierarchy</h4>
      <div className="space-y-1">
        {meshes.map((m) => (
          <div 
            key={m.uuid} 
            onClick={() => setSelectedMesh(m.name)}
            className={`cursor-pointer p-1 text-sm rounded transition-colors ${
              selectedMesh === m.name ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-zinc-300'
            }`}
          >
            <span className="opacity-50 mr-2">📦</span>
            {m.name || 'Unnamed Mesh'}
          </div>
        ))}
      </div>
    </div>
  );
};