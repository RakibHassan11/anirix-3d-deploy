/* --- src/core-engine/core/materials.ts --- */
import * as THREE from 'three';
export const applyProps = (mesh: THREE.Mesh, props: unknown) => {
  if (mesh.material) Object.assign(mesh.material, props);
};