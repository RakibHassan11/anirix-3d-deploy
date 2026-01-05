'use client';
import React from 'react';
import { Box, RotateCw, Layers, Settings, Maximize, HelpCircle } from 'lucide-react';
import { ControlButton } from '@/presentation/components/ControlButton';
import { useViewerStore } from '@/core-engine';


export const Toolbar = () => {
  const { showInspector, toggleInspector, wireframe, setWireframe, autoRotate, setAutoRotate } = useViewerStore();

  const handleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };

  return (
    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full shadow-2xl pointer-events-auto">
      {/* View Modes */}
      <ControlButton 
        active={showInspector} 
        onClick={toggleInspector} 
        icon={<Layers size={20} />} 
        label="Model Inspector" 
      />
      
      <div className="w-[1px] h-6 bg-white/10 mx-1" />

      <ControlButton 
        active={wireframe} 
        onClick={() => setWireframe(!wireframe)} 
        icon={<Box size={20} />} 
        label="Wireframe" 
      />
      
      <ControlButton 
        active={autoRotate} 
        onClick={() => setAutoRotate(!autoRotate)} 
        icon={<RotateCw size={20} />} 
        label="Auto-Rotation" 
      />

      <div className="w-[1px] h-6 bg-white/10 mx-1" />

      {/* Utilities */}
      <ControlButton icon={<Settings size={20} />} label="Settings" />
      <ControlButton icon={<Maximize size={20} />} onClick={handleFullscreen} label="Fullscreen" />
      <ControlButton icon={<HelpCircle size={20} />} label="Help" />
    </div>
  );
};