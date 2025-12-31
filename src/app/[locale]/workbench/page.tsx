/* --- src/app/[locale]/workbench/page.tsx --- */
import { Suspense } from 'react';
import { Viewport } from '@/core-engine/components/canvas/Viewport';
import { Model } from '@/core-engine/components/model/Model';
import { Toolbar } from '@/presentation/ui/viewer-ui/Toolbar';

export default function WorkbenchPage() {
  // Use a reliable model URL
  const TEST_MODEL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb';

  return (
    <main className="h-screen w-full bg-[#050505] relative overflow-hidden">
      {/* 3D Scene Container */}
      <div className="absolute inset-0">
        <Viewport>
          <Suspense fallback={null}>
            <Model url={TEST_MODEL} />
          </Suspense>
        </Viewport>
      </div>

      {/* Branded UI Overlay */}
      <div className="absolute top-8 left-8 pointer-events-none z-10">
        <h1 className="text-white/20 font-mono text-[10px] tracking-[0.3em] uppercase italic">
          Anirix_Engine_Core // System_Active
        </h1>
      </div>

      <Toolbar />
    </main>
  );
}