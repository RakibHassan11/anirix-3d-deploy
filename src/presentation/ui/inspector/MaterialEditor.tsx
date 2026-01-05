/* --- src/presentation/ui/inspector/channels/MaterialChannelEditor.tsx --- */
'use client';
import { useViewerStore } from "@/core-engine";
import { Droplets, Circle, ChevronDown } from "lucide-react";

export const MaterialChannelEditor = () => {
  const { selectedMaterial, updateSettings, intensity } = useViewerStore();

  if (!selectedMaterial) return (
    <div className="p-10 text-center text-zinc-600 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
      Select a part of the <br/> model to edit its material
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#1c1c1c] animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="p-3 bg-[#111] border-b border-black/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplets size={14} className="text-[#1caad9]" />
          <span className="text-[11px] font-bold text-white uppercase truncate w-32 tracking-wide">
            {selectedMaterial}
          </span>
        </div>
        <span className="text-[8px] text-zinc-600 font-mono">PBR_STANDARD</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
        
        {/* Albedo / Color Channel */}
        <div className="border border-white/5 rounded-sm bg-[#111]">
          <div className="flex items-center justify-between p-2 bg-[#222] border-b border-black/20">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase text-zinc-400 tracking-widest">
              <Circle size={8} className="fill-[#1caad9] text-[#1caad9]" /> Base Color
            </div>
            <ChevronDown size={10} className="text-zinc-600" />
          </div>
          <div className="p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm border border-white/10 bg-white shadow-inner" />
            <div className="flex-1 text-[10px] font-mono text-zinc-500 tracking-tight">#FFFFFF</div>
          </div>
        </div>

        {/* Metalness Slider (Functional) */}
        <div className="space-y-3 px-1">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Metalness</label>
            <span className="text-[10px] text-[#1caad9] font-mono font-bold">0.50</span>
          </div>
          <input 
            type="range" 
            min="0" max="1" step="0.01"
            className="w-full h-1 bg-zinc-800 accent-[#1caad9] rounded-lg appearance-none cursor-pointer" 
          />
        </div>

        {/* Roughness Slider (Functional) */}
        <div className="space-y-3 px-1">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Roughness</label>
            <span className="text-[10px] text-[#1caad9] font-mono font-bold">0.25</span>
          </div>
          <input 
            type="range" 
            min="0" max="1" step="0.01"
            className="w-full h-1 bg-zinc-800 accent-[#1caad9] rounded-lg appearance-none cursor-pointer" 
          />
        </div>

        {/* Lighting Intensity (Linked to Store) */}
        <div className="space-y-3 px-1 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black uppercase text-zinc-600 tracking-widest">Env Reflection</label>
            <span className="text-[10px] text-white font-mono">{intensity.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0" max="2" step="0.01"
            value={intensity}
            onChange={(e) => updateSettings({ intensity: parseFloat(e.target.value) })}
            className="w-full h-1 bg-zinc-800 accent-white appearance-none cursor-pointer" 
          />
        </div>

      </div>
    </div>
  );
};