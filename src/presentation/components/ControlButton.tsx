'use client';
import React from 'react';

interface ControlButtonProps {
  /** The Lucide icon component */
  icon: React.ReactNode;
  /** Whether the toggle is currently active */
  active?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Tooltip and accessibility label */
  label: string;
  /** Optional extra classes */
  className?: string;
}

export const ControlButton = ({ 
  icon, 
  active = false, 
  onClick, 
  label,
  className = "" 
}: ControlButtonProps) => (
  <button
    onClick={onClick}
    title={label}
    aria-label={label}
    className={`p-2 rounded-md transition-all duration-200 flex items-center justify-center cursor-pointer ${
      active 
        ? 'text-[#1caad9] bg-[#1caad9]/15' // Signature Sketchfab Blue
        : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
    } ${className}`}
  >
    {icon}
  </button>
);