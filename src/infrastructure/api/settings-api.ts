/* --- src/infrastructure/api/settings-api.ts --- */
import { ViewerSettings } from '@/core-engine/types/engine';

export const saveSettings = async (id: string, settings: Partial<ViewerSettings>) => {
  // Logic to save to local storage or external DB
  localStorage.setItem(`anirix_settings_${id}`, JSON.stringify(settings));
};

/* --- src/infrastructure/validators/model-validator.ts --- */
import * as THREE from 'three';

export const validateModelSize = (scene: THREE.Group): boolean => {
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z);
  
  // Reject models that are technically "invisible" or infinitely large
  return maxDimension > 0 && maxDimension < 10000;
};