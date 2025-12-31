'use client';

import React from 'react';

interface ToggleProps {
  /** The text displayed next to the switch */
  label: string;
  /** The current state of the toggle */
  active: boolean;
  /** Function triggered when the toggle is clicked */
  onClick: () => void;
}

/**
 * A specialized UI Toggle switch for the Anirix 3D Engine.
 * Features a hardware-accelerated sliding transition and dark-theme aesthetics.
 */
export const Toggle = ({ label, active, onClick }: ToggleProps) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center justify-between w-full p-2.5 rounded-md transition-all duration-200 border ${
        active 
          ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' 
          : 'bg-zinc-900/50 border-white/5 hover:border-white/10 text-zinc-400'
      }`}
    >
      <span className="text-[10px] font-bold uppercase tracking-widest">
        {label}
      </span>
      
      {/* The Switch Track */}
      <div className={`
        relative w-8 h-4 rounded-full transition-colors duration-300
        ${active ? 'bg-blue-600' : 'bg-zinc-800'}
      `}>
        {/* The Sliding Knob */}
        <div className={`
          absolute top-1 w-2 h-2 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out
          ${active ? 'left-5' : 'left-1'}
        `} />
      </div>
    </button>
  );
};