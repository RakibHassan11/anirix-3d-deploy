import { create } from 'zustand';
import { ViewerSettings } from '@/core-engine/types/engine';

interface ViewerStore extends ViewerSettings {
  // Actions
  updateSettings: (settings: Partial<ViewerSettings>) => void;
  setWireframe: (wireframe: boolean) => void;
  setAutoRotate: (autoRotate: boolean) => void;
  setSelectedMesh: (name: string | null) => void;
  setLoadingProgress: (p: number) => void;
}

export const useViewerStore = create<ViewerStore>((set) => ({
  // 1. Initial State
  autoRotate: false,
  wireframe: false,
  intensity: 0.5,
  environment: 'city',
  selectedMesh: null,
  performanceTier: 'medium',
  loadingProgress: 0,

  // 2. Actions (Implementation must match Interface exactly)
  updateSettings: (newSettings) => 
    set((state) => ({ ...state, ...newSettings })),

  setWireframe: (wireframe: boolean) => 
    set(() => ({ wireframe })),

  setAutoRotate: (autoRotate: boolean) => 
    set(() => ({ autoRotate })),

  setSelectedMesh: (selectedMesh: string | null) => 
    set(() => ({ selectedMesh })),

  setLoadingProgress: (loadingProgress: number) => 
    set(() => ({ loadingProgress })),
}));