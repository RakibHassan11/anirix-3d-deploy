'use client';

import React from 'react';
import { EnvPreset, useViewerStore, InspectorTab } from "@/core-engine";
import { 
  X, ChevronDown, Eye, EyeOff, Layers, 
  Box, Sun, Droplets, Sparkles, 
  Search, Info, MousePointer2, Circle, Database, Sliders, ChevronRight
} from "lucide-react";

export const Sidebar = () => {
  const { 
    // State & Actions from Store
    wireframe, setWireframe, 
    autoRotate, setAutoRotate, 
    environment, updateSettings,
    toggleInspector,
    sceneHierarchy,
    hiddenMeshes,       // Functional visibility state
    toggleVisibility,   // Functional visibility action
    isLoading,
    activeTab,
    setActiveTab,
    selectedMaterial,
    selectedMesh,
    setSelectedMesh,
    stats
  } = useViewerStore();

  if (isLoading) return null;

  return (
    <div className="h-full w-[280px] bg-[#1a1a1a] flex flex-col text-[#eee] shadow-2xl border-r border-black/40 pointer-events-auto select-none font-sans antialiased">
      
      {/* 1. SKETCHFAB TOP TAB BAR */}
      <div className="flex bg-[#111] border-b border-white/5">
        {[
          { id: 'scene' as InspectorTab, icon: <Layers size={16} />, label: 'Scene' },
          { id: 'materials' as InspectorTab, icon: <Droplets size={16} />, label: 'Mat' },
          { id: 'lighting' as InspectorTab, icon: <Sun size={16} />, label: 'Light' },
          { id: 'post-process' as InspectorTab, icon: <Sparkles size={16} />, label: 'Post' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 transition-all relative ${
              activeTab === tab.id 
                ? 'text-[#1caad9]' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab.icon}
            <span className="text-[8px] uppercase font-bold tracking-widest">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1caad9]" />
            )}
          </button>
        ))}
        <button 
          onClick={toggleInspector}
          className="px-3 text-zinc-600 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* --- TAB CONTENT: SCENE (Hierarchy & Properties) --- */}
        {activeTab === 'scene' && (
          <div className="animate-in fade-in duration-300">
            <div className="p-2 bg-[#1c1c1c] border-b border-white/5">
              <div className="relative group">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#1caad9] transition-colors" size={12} />
                <input 
                  type="text" 
                  placeholder="Search scene..." 
                  className="w-full bg-[#111] border border-white/5 rounded-sm py-1.5 pl-7 pr-2 text-[11px] outline-none focus:border-[#1caad9]/30 transition-all placeholder:text-zinc-700 font-mono"
                />
              </div>
            </div>

            {/* Scene Graph */}
            <section className="mb-px">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#282828] text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-black/20">
                <div className="flex items-center gap-2">
                  <ChevronDown size={12} className="text-zinc-500" />
                  <span className="text-white/80">Scene Graph</span>
                </div>
                <MousePointer2 size={10} className="opacity-30" />
              </div>
              
              <div className="py-1 bg-[#1a1a1a]">
                {sceneHierarchy.map((name, index) => {
                  const isHidden = hiddenMeshes.includes(name);
                  const isSelected = selectedMesh === name;
                  return (
                    <div 
                      key={index} 
                      onClick={() => setSelectedMesh(name)}
                      className={`group flex items-center justify-between px-3 py-1 cursor-pointer border-l-2 transition-colors ${
                        isSelected ? 'bg-[#1caad9]/20 border-[#1caad9]' : 'hover:bg-[#1caad9]/5 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Box size={11} className={isHidden ? 'text-zinc-700' : 'text-[#1caad9]'} />
                        <span className={`text-[11px] truncate transition-colors ${
                          isHidden ? 'text-zinc-600' : isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                        }`}>
                          {name}
                        </span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleVisibility(name); }}
                        className="p-1 hover:text-white transition-colors"
                      >
                        {isHidden ? <EyeOff size={11} className="text-zinc-700" /> : <Eye size={11} className="text-zinc-500 opacity-0 group-hover:opacity-100" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* General Properties */}
            <section className="mb-px">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#282828] text-[10px] font-bold uppercase tracking-wider text-white/60">
                <div className="flex items-center gap-2">
                  <ChevronDown size={12} />
                  <span>Display Properties</span>
                </div>
              </div>
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between group">
                  <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-tight">Wireframe</span>
                  <button onClick={() => setWireframe(!wireframe)} className={`w-7 h-3.5 rounded-full relative transition-colors ${wireframe ? 'bg-[#1caad9]' : 'bg-zinc-800'}`}>
                    <div className={`absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full transition-all ${wireframe ? 'left-4' : 'left-0.5'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between group">
                  <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-tight">Auto-Rotation</span>
                  <button onClick={() => setAutoRotate(!autoRotate)} className={`w-7 h-3.5 rounded-full relative transition-colors ${autoRotate ? 'bg-[#1caad9]' : 'bg-zinc-800'}`}>
                    <div className={`absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full transition-all ${autoRotate ? 'left-4' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- TAB CONTENT: MATERIALS (PBR Channel Editor) --- */}
        {activeTab === 'materials' && (
          <div className="flex flex-col h-full animate-in fade-in duration-300">
            {!selectedMaterial ? (
              <div className="p-10 text-center text-zinc-600 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                Click a part of the <br/> model to inspect <br/> its material
              </div>
            ) : (
              <>
                <div className="p-3 bg-[#111] border-b border-black/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets size={14} className="text-[#1caad9]" />
                    <span className="text-[11px] font-bold text-white uppercase truncate w-32 tracking-wide">{selectedMaterial}</span>
                  </div>
                  <span className="text-[8px] text-zinc-600 font-mono tracking-tighter">PBR_ENGINE_v1</span>
                </div>

                <div className="p-3 space-y-4">
                  {/* PBR Channel Dropdown: Base Color */}
                  <div className="border border-white/5 rounded-sm bg-[#111]">
                    <div className="flex items-center justify-between p-2 bg-[#222] border-b border-black/20 cursor-pointer">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase text-zinc-400">
                        <Circle size={8} className="fill-[#1caad9] text-[#1caad9]" /> Base Color
                      </div>
                      <ChevronDown size={10} className="text-zinc-600" />
                    </div>
                    <div className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm border border-white/10 bg-[#f5f5f5]" />
                      <div className="flex-1 text-[10px] font-mono text-zinc-500 select-all tracking-tight">#F5F5F5</div>
                    </div>
                  </div>

                  {/* Channel: Metalness */}
                  <div className="space-y-3 px-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                        Metalness
                      </label>
                      <span className="text-[10px] text-[#1caad9] font-mono font-bold">0.50</span>
                    </div>
                    <input type="range" className="w-full h-1 bg-zinc-800 accent-[#1caad9] rounded-lg appearance-none cursor-pointer" />
                  </div>

                  {/* Channel: Roughness */}
                  <div className="space-y-3 px-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                        Roughness
                      </label>
                      <span className="text-[10px] text-[#1caad9] font-mono font-bold">0.25</span>
                    </div>
                    <input type="range" className="w-full h-1 bg-zinc-800 accent-[#1caad9] rounded-lg appearance-none cursor-pointer" />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* --- TAB CONTENT: LIGHTING --- */}
        {activeTab === 'lighting' && (
          <section className="p-4 animate-in fade-in duration-300">
             <div className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-[0.1em] text-white/80">
              <Sun size={14} className="text-[#1caad9]" /> <span>Environment HDRI</span>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-black text-zinc-600 tracking-widest">Preset Selection</label>
              <select 
                value={environment}
                onChange={(e) => updateSettings({ environment: e.target.value as EnvPreset })}
                className="w-full bg-[#111] border border-white/10 rounded-sm px-2 py-2 text-[10px] text-white outline-none cursor-pointer hover:border-[#1caad9]/40 transition-colors uppercase font-bold"
              >
                <option value="city">Industrial City</option>
                <option value="dawn">Morning Dawn</option>
                <option value="night">Outer Space</option>
                <option value="warehouse">Studio Warehouse</option>
              </select>
            </div>
          </section>
        )}
      </div>

      {/* 6. TECHNICAL GEOMETRY FOOTER */}
      <div className="bg-[#111] border-t border-white/5 p-3 space-y-3">
        <div className="flex items-center gap-2 text-[9px] text-zinc-600 uppercase font-black tracking-widest">
          <Database size={10} />
          <span>Geometry Data</span>
        </div>
        <div className="grid grid-cols-2 gap-y-1.5 border-t border-white/5 pt-2">
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Triangles</span>
          <span className="text-[11px] text-white text-right font-mono font-bold">
            {stats.triangles.toLocaleString()}
          </span>
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Vertices</span>
          <span className="text-[11px] text-[#1caad9] text-right font-mono font-bold">
            {stats.vertices.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};