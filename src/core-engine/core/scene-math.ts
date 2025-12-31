/* --- src/core-engine/core/scene-math.ts --- */
import * as THREE from 'three';

export const getFitValues = (obj: THREE.Object3D) => {
  const box = new THREE.Box3().setFromObject(obj);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  return { center, size, box };
};

/**
 * Physically centers an object so its middle point is at (0,0,0)
 */
export const centerModel = (obj: THREE.Object3D) => {
  const { center } = getFitValues(obj);
  obj.position.x -= center.x;
  obj.position.y -= center.y;
  obj.position.z -= center.z;
};