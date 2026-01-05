'use client';

import { useViewerStore } from '@/core-engine/store/use-viewer';


export const LoadingOverlay = () => {
  // 1. Connect directly to your Custom Stream Store
  const { loadingProgress, isLoading, streamStatus } = useViewerStore();

  // 2. Control visibility via your internal Mock Stream state
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-50 pointer-events-auto backdrop-blur-sm">
      <div className="w-64">
        {/* Progress Bar Container */}
        <div className="h-[1px] w-full bg-white/10 overflow-hidden relative">
          {/* Glowing background for the bar */}
          <div 
            className="absolute inset-0 bg-cyan-500/20 blur-[2px]" 
            style={{ width: `${loadingProgress}%` }}
          />
          {/* Main Progress Line */}
          <div 
            className="h-full bg-cyan-400 transition-all duration-300 ease-out relative z-10" 
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        
        {/* Technical Status Display */}
        <div className="mt-4 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.2em]">
          <div className="flex justify-between items-center">
            <span className="text-white/40 italic">Anirix_System_Hydration</span>
            <span className="text-cyan-400 font-bold">{Math.round(loadingProgress)}%</span>
          </div>
          
          {/* Show the status (e.g., "Initializing", "Textures", etc.) */}
          <div className="flex justify-between items-center opacity-30 text-[7px]">
            <span>Status // {streamStatus}</span>
            <span className="animate-pulse">Active_Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
};