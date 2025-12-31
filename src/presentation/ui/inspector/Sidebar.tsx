'use client';
import React from 'react';
import { Slider } from '@/presentation/components/Slider';
import { Toggle } from '@/presentation/components/Toggle';
import { useViewerStore } from '@/core-engine/store/use-viewer';

export const Sidebar = () => {
  const { intensity, updateSettings, wireframe, setWireframe } = useViewerStore();

  return (
    <aside className="w-72 h-full bg-[#111111] border-l border-white/5 flex flex-col text-white">
      <div className="p-4 border-b border-white/5 flex justify-between items-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Model Inspector</h2>
        <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">PRO</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Material Section */}
        <section className="p-4 space-y-4">
          <div className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">Properties</div>
          <Slider 
            label="Exposure" 
            value={intensity} 
            min={0} max={2} 
            onChange={(val) => updateSettings({ intensity: val })} 
          />
          <Toggle 
            label="X-Ray (Wireframe)" 
            active={wireframe} 
            onClick={() => setWireframe(!wireframe)} 
          />
        </section>

        <section className="p-4 border-t border-white/5">
          <div className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">Scene Environment</div>
          {/* Add more controls here */}
        </section>
      </div>
    </aside>
  );
};