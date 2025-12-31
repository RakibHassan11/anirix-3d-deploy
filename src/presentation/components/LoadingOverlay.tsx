/* --- src/presentation/components/LoadingOverlay.tsx --- */
'use client';
import { useProgress } from '@react-three/drei';

export const LoadingOverlay = () => {
  const { progress, active } = useProgress();

  // IMPORTANT: Ensure the overlay disappears when loading is done
  if (!active) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/95 z-[100] transition-opacity duration-500">
      <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#1caad9] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
        Anirix Engine // Streaming Data: {Math.round(progress)}%
      </p>
    </div>
  );
};