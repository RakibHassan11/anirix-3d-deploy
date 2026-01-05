/* --- src/shared/store/useViewerStore.ts --- */
import { create } from 'zustand';
import { ViewerSettings } from '@/core-engine/types/engine';

interface ViewerStore extends ViewerSettings {
  // Streaming States
  isLoading: boolean;
  streamStatus: string;
  loadingProgress: number;
  
  // Hierarchy State (Crucial for the Sidebar!)
  sceneHierarchy: string[]; 

  // Actions
  updateSettings: (settings: Partial<ViewerSettings>) => void;
  setWireframe: (wireframe: boolean) => void;
  setAutoRotate: (autoRotate: boolean) => void;
  setSelectedMesh: (name: string | null) => void;
  
  // Streaming & Hierarchy Actions
  setLoadingProgress: (p: number) => void;
  setIsLoading: (loading: boolean) => void;
  setStreamStatus: (status: string) => void;
  setSceneHierarchy: (names: string[]) => void; // Fixed the missing action
  resetLoading: () => void;
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
  isLoading: false,
  streamStatus: 'Idle',
  sceneHierarchy: [], // Initialized as empty

  // 2. Actions
  updateSettings: (newSettings) => 
    set((state) => ({ ...state, ...newSettings })),

  setWireframe: (wireframe) => set({ wireframe }),
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  setSelectedMesh: (selectedMesh) => set({ selectedMesh }),

  setLoadingProgress: (p) => set(() => ({ 
    loadingProgress: p,
    isLoading: p < 100 
  })),

  setIsLoading: (isLoading) => set({ isLoading }),
  setStreamStatus: (streamStatus) => set({ streamStatus }),
  
  // Fixed: Now Model.tsx can call this without errors
  setSceneHierarchy: (sceneHierarchy) => set({ sceneHierarchy }),

  resetLoading: () => set({ 
    loadingProgress: 0, 
    isLoading: false, 
    streamStatus: 'Idle',
    sceneHierarchy: []
  }),
}));