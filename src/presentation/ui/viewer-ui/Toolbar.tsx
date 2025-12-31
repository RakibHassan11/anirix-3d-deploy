/* --- src/presentation/ui/viewer-ui/Toolbar.tsx --- */
'use client';
import React from 'react';
import { Maximize, Settings, Box, RotateCw, Info, HelpCircle } from 'lucide-react';
import { useViewerStore } from '@/core-engine/store/use-viewer';
import { ControlButton } from '@/presentation/components/ControlButton';

export const Toolbar = () => {
  const { wireframe, setWireframe, autoRotate, setAutoRotate } = useViewerStore();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between px-4 z-50 select-none">
      
      {/* LEFT: Model Info Cluster */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg">
          <Box size={18} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-white text-xs font-bold leading-none">Anirix Model Viewer</span>
          <span className="text-zinc-500 text-[10px] uppercase tracking-wider">v1.0.4 // Production</span>
        </div>
      </div>

      {/* RIGHT: Control Cluster */}
      <div className="flex items-center gap-1">
        
        {/* Wireframe Toggle */}
        <ControlButton 
          active={wireframe} 
          onClick={() => setWireframe(!wireframe)}
          icon={<Box size={18} />}
          label="Wireframe"
        />

        {/* Rotation Toggle */}
        <ControlButton 
          active={autoRotate} 
          onClick={() => setAutoRotate(!autoRotate)}
          icon={<RotateCw size={18} />}
          label="Auto-Rotate"
        />

        <div className="w-[1px] h-6 bg-white/10 mx-2" />

        {/* Standard Viewer Tools */}
        <ControlButton icon={<Settings size={18} />} label="Settings" />
        <ControlButton icon={<Info size={18} />} label="Model Inspector" />
        <ControlButton icon={<Maximize size={18} />} onClick={toggleFullScreen} label="Fullscreen" />
        
        <button className="ml-2 text-zinc-500 hover:text-white transition-colors">
          <HelpCircle size={20} />
        </button>
      </div>
    </div>
  );
};
