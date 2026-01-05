'use client';

import { EnvPreset, useViewerStore } from "@/core-engine";


export const Sidebar = () => {
  const { 
    wireframe, setWireframe, 
    autoRotate, setAutoRotate, 
    environment, updateSettings,
    loadingProgress, isLoading 
  } = useViewerStore();

  if (isLoading) return null;

  return (
    <div className="absolute top-4 right-4 bottom-4 w-72 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-8 text-white z-20 pointer-events-auto">
      {/* Header */}
      <div>
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-500 mb-1">
          Model_Inspector
        </h2>
        <div className="h-[1px] w-full bg-gradient-to-r from-cyan-500/50 to-transparent" />
      </div>

      {/* Section: Display Settings */}
      <div className="space-y-4">
        <h3 className="font-mono text-[9px] uppercase text-white/40 tracking-widest">Display_Controls</h3>
        
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-[11px] font-medium text-white/70 group-hover:text-white transition-colors">Wireframe Mode</span>
          <input 
            type="checkbox" 
            checked={wireframe} 
            onChange={(e) => setWireframe(e.target.checked)}
            className="w-3 h-3 accent-cyan-500"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-[11px] font-medium text-white/70 group-hover:text-white transition-colors">Auto-Rotation</span>
          <input 
            type="checkbox" 
            checked={autoRotate} 
            onChange={(e) => setAutoRotate(e.target.checked)}
            className="w-3 h-3 accent-cyan-500"
          />
        </label>
      </div>

      {/* Section: Environment Switcher */}
      <div className="space-y-4">
        <h3 className="font-mono text-[9px] uppercase text-white/40 tracking-widest">Environment</h3>
       <select 
        value={environment}
        onChange={(e) => {
          // 2. Cast the string value to EnvPreset
          updateSettings({ environment: e.target.value as EnvPreset });
        }}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-cyan-500/50 transition-colors capitalize"
      >
        <option value="city">Urban Studio</option>
        <option value="dawn">Early Morning</option>
        <option value="night">Deep Space</option>
        <option value="warehouse">Industrial</option>
      </select>
      </div>

      {/* Footer / Stats */}
      <div className="mt-auto pt-4 border-t border-white/5">
        <div className="flex justify-between font-mono text-[8px] text-white/30 uppercase tracking-tighter">
          <span>Buffer_Status</span>
          <span className="text-cyan-500/50">Optimized</span>
        </div>
      </div>
    </div>
  );
};