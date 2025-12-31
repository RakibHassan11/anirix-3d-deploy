/* --- src/core-engine/hooks/use-raycaster.ts --- */
import { useViewerStore } from '@/core-engine/store/use-viewer';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber'; // Import the correct event type

export const useRaycaster = () => {
  const setSelectedMesh = useViewerStore((s) => s.setSelectedMesh);

  // Replace 'any' with ThreeEvent<PointerEvent>
  return (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    
    // Type guard to ensure the clicked object is a Mesh
    if (event.object && (event.object as THREE.Mesh).isMesh) {
      setSelectedMesh(event.object.name);
    }
  };
};