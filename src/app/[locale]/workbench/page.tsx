/* --- src/app/[locale]/workbench/page.tsx --- */
import { Suspense } from 'react';
import { Viewport } from '@/core-engine/components/canvas/Viewport';
import { Model } from '@/core-engine/components/model/Model';
import { Toolbar } from '@/presentation/ui/viewer-ui/Toolbar';
import { LoadingOverlay } from '@/presentation/components/LoadingOverlay';

export default function WorkbenchPage() {
  const TEST_MODEL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb';

  return (
    <main className="h-screen w-full bg-[#050505] relative overflow-hidden">
      {/* 3D ENGINE LAYER (Contains only 3D objects) */}
      <div className="absolute inset-0 z-0">
        <Viewport>
          <Suspense fallback={null}>
            <Model url={TEST_MODEL} />
          </Suspense>
        </Viewport>
      </div>

      {/* HTML UI LAYER (Placed OUTSIDE the Viewport) */}
      {/* Use pointer-events-none so we can still interact with the 3D model through the UI gaps */}
      <div className="absolute inset-0 pointer-events-none z-10">
        
        {/* Loading Progress: Must be outside Viewport to render as HTML */}
        <LoadingOverlay />

        {/* Branded Status Bar */}
        <div className="absolute top-8 left-8">
          <h1 className="text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase italic">
            Anirix_Engine_Core // System_Active
          </h1>
        </div>

        {/* Bottom Toolbar: Ensure children have pointer-events-auto to be clickable */}
        <div className="absolute bottom-0 left-0 w-full p-8 flex justify-center pointer-events-auto">
          <Toolbar />
        </div>
      </div>
    </main>
  );
}