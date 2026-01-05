import { create } from 'zustand';
import { ViewerSettings, EnvPreset } from '@/core-engine/types/engine';

// Define the available tabs in the Inspector to match Sketchfab channels
export type InspectorTab = 'scene' | 'materials' | 'lighting' | 'post-process';

interface ViewerStore extends ViewerSettings {
  // --- UI & Navigation States ---
  showInspector: boolean;
  activeTab: InspectorTab;
  
  // --- Loading & Streaming ---
  isLoading: boolean;
  streamStatus: string;
  loadingProgress: number;
  
  // --- Scene & Hierarchy ---
  sceneHierarchy: string[]; 
  hiddenMeshes: string[];       // 🆕 Added: Tracks names of meshes hidden via the "Eye" icon
  selectedMesh: string | null;
  selectedMaterial: string | null; 
  
  // --- Technical Stats ---
  stats: {
    triangles: number;
    vertices: number;
  };

  // --- Actions ---
  toggleInspector: () => void;
  setActiveTab: (tab: InspectorTab) => void;
  updateSettings: (settings: Partial<ViewerSettings>) => void;
  
  // Controls
  setWireframe: (wireframe: boolean) => void;
  setAutoRotate: (autoRotate: boolean) => void;
  setSelectedMesh: (name: string | null) => void;
  setSelectedMaterial: (name: string | null) => void;
  toggleVisibility: (name: string) => void; // 🆕 Added: Action for the Scene Graph Eye icon
  
  // Scene Data Actions
  setLoadingProgress: (p: number) => void;
  setIsLoading: (loading: boolean) => void;
  setStreamStatus: (status: string) => void;
  setSceneHierarchy: (names: string[]) => void;
  setStats: (triangles: number, vertices: number) => void;
  
  resetLoading: () => void;
}

export const useViewerStore = create<ViewerStore>((set) => ({
  // 1. Initial States
  showInspector: false,
  activeTab: 'scene',
  
  autoRotate: false,
  wireframe: false,
  intensity: 0.5,
  environment: 'city' as EnvPreset,
  selectedMesh: null,
  selectedMaterial: null,
  hiddenMeshes: [], // 🆕 Initialized as empty
  performanceTier: 'medium',
  
  loadingProgress: 0,
  isLoading: false,
  streamStatus: 'Idle',
  sceneHierarchy: [],
  
  stats: {
    triangles: 0,
    vertices: 0
  },

  // 2. Navigation Actions
  toggleInspector: () => set((state) => ({ showInspector: !state.showInspector })),
  setActiveTab: (activeTab) => set({ activeTab }),

  // 3. Engine Settings Actions
  updateSettings: (newSettings) => 
    set((state) => ({ ...state, ...newSettings })),

  setWireframe: (wireframe) => set({ wireframe }),
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  
  // Enhanced: When selecting a mesh, we often want to jump to its material (Sketchfab behavior)
  setSelectedMesh: (selectedMesh) => set({ 
    selectedMesh,
  }),

  setSelectedMaterial: (selectedMaterial) => set({ 
    selectedMaterial, 
    activeTab: 'materials' 
  }),

  // 🆕 Visibility Toggle Logic
  toggleVisibility: (name) => set((state) => ({
    hiddenMeshes: state.hiddenMeshes.includes(name)
      ? state.hiddenMeshes.filter(n => n !== name) // Show if currently hidden
      : [...state.hiddenMeshes, name]             // Hide if currently visible
  })),

  // 4. Scene Data Actions
  setLoadingProgress: (p) => set(() => ({ 
    loadingProgress: p,
    isLoading: p < 100 
  })),

  setIsLoading: (isLoading) => set({ isLoading }),
  setStreamStatus: (streamStatus) => set({ streamStatus }),
  setSceneHierarchy: (sceneHierarchy) => set({ sceneHierarchy }),
  
  setStats: (triangles, vertices) => set({ stats: { triangles, vertices } }),

  resetLoading: () => set({ 
    loadingProgress: 0, 
    isLoading: false, 
    streamStatus: 'Idle',
    sceneHierarchy: [],
    hiddenMeshes: [], // 🆕 Clear hidden meshes on reset
    selectedMaterial: null,
    stats: { triangles: 0, vertices: 0 }
  }),
}));