/* --- src/infrastructure/validators/model-validator.ts --- */
import * as THREE from 'three';

export interface ValidationResult {
  isValid: boolean;
  polygons: number;
  error?: string;
}

/** Validates 3D meshes before they are accepted by the Viewer */
export const validateModel = (object: THREE.Object3D): ValidationResult => {
  let triangles = 0;
  
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.geometry.index) {
        triangles += mesh.geometry.index.count / 3;
      } else {
        triangles += mesh.geometry.attributes.position.count / 3;
      }
    }
  });

  const MAX_POLYS = 1_500_000;
  return {
    isValid: triangles < MAX_POLYS,
    polygons: triangles,
    error: triangles > MAX_POLYS ? 'Polycount too high for web' : undefined
  };
};