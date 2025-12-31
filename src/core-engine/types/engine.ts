/* --- @/core-engine/types/engine.ts --- */
export type EnvPreset = 'city' | 'studio' | 'lobby' | 'sunset';

export interface ViewerSettings {
  autoRotate: boolean;
  wireframe: boolean;
  intensity: number;
  environment: EnvPreset;
  selectedMesh: string | null;
  performanceTier: 'low' | 'medium' | 'high';
  loadingProgress: number;
}