/* --- src/core-engine/core/camera-controller.ts --- */
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib'; // Import the specific type

export const focusCameraOnObject = (
  camera: THREE.PerspectiveCamera, 
  controls: OrbitControls, // Type specified instead of any
  object: THREE.Object3D
) => {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = 1.2 * Math.max(fitHeightDistance, fitWidthDistance);

  // Use the center directly to update controls
  const direction = controls.object.position.clone().sub(controls.target).normalize().multiplyScalar(distance);
  
  camera.position.copy(center).add(direction);
  controls.target.copy(center);
  controls.update();
};