'use client';
import { Viewport } from '@/core-engine/components/canvas/Viewport';
import { Model } from '@/core-engine/components/model/Model';
import { Sidebar } from '@/presentation/ui/inspector/Sidebar';
import { LoadingOverlay } from '@/presentation/components/LoadingOverlay';
import { useViewerStore } from '@/core-engine/store/use-viewer';

export default function WorkbenchPage() {
  const { isLoading } = useViewerStore();

  return (
    <main className="h-screen w-full bg-[#050505] relative overflow-hidden flex flex-col">
      <div className="flex-1 relative">
        <Viewport>
          <Model url="/models/HORNET.glb" />
        </Viewport>
      </div>

      <div className="absolute inset-0 pointer-events-none z-50">
        <LoadingOverlay />
        <Sidebar />
      </div>
    </main>
  );
}