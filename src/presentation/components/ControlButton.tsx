'use client';
import React from 'react';

interface ControlButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  label: string;
  className?: string;
}

export const ControlButton = ({ icon, active = false, onClick, label, className = "" }: ControlButtonProps) => (
  <button
    onClick={onClick}
    className={`p-2.5 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer relative group ${
      active ? 'text-[#1caad9]' : 'text-zinc-400 hover:text-white'
    } ${className}`}
  >
    {icon}
    {/* Sketchfab Blue Dot for active state */}
    {active && (
      <span className="absolute -bottom-0.5 w-1 h-1 bg-[#1caad9] rounded-full shadow-[0_0_8px_#1caad9]" />
    )}
    
    {/* Tooltip */}
    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none border border-white/10 uppercase tracking-tighter">
      {label}
    </div>
  </button>
);