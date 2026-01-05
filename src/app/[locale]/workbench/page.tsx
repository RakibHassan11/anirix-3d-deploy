'use client';
import { Viewport } from '@/core-engine/components/canvas/Viewport';
import { Model } from '@/core-engine/components/model/Model';
import { Toolbar } from '@/presentation/ui/viewer-ui/Toolbar';
import { Sidebar } from '@/presentation/ui/inspector/Sidebar';
import { useViewerStore } from '@/core-engine';

export default function WorkbenchPage() {
  const { showInspector } = useViewerStore();

  return (
    <main className="relative h-screen w-full bg-[#050505] overflow-hidden select-none">
      
      {/* BOTTOM LAYER: 3D ENGINE */}
      <div className="absolute inset-0 z-0">
        <Viewport>
          <Model url="/models/HORNET.glb" />
        </Viewport>
      </div>

      {/* TOP LAYER: HUD UI */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6">
        
        {/* TOP: Header HUD */}
        <header className="flex justify-end items-start">
          <div className="pointer-events-auto flex items-center gap-3 bg-black/50 backdrop-blur-md p-3 rounded-md border border-white/10 shadow-lg">
            <div className="w-9 h-9 bg-[#1caad9] rounded flex items-center justify-center font-black text-white text-lg">A</div>
            <div>
              <h1 className="text-white font-bold text-sm tracking-tight leading-none mb-1 uppercase">Hornet Drone</h1>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">by <span className="text-[#1caad9]">Anirix Labs</span></p>
            </div>
          </div>
        </header>

        {/* BOTTOM: Floating Toolbar */}
        <div className="flex justify-center w-full">
          <Toolbar />
        </div>
      </div>

      {/* OVERLAY LAYER: Inspector Sidebar (Positioned LEFT) */}
      {showInspector && (
        /* Change: right-0 -> left-0 | slide-in-from-right -> slide-in-from-left */
        <div className="absolute left-0 top-0 bottom-0 z-50 pointer-events-auto transition-all animate-in slide-in-from-left duration-300">
          <Sidebar />
        </div>
      )}

    </main>
  );
}