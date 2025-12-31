'use client';

import React from 'react';

interface SliderProps {
  /** Label for the slider */
  label: string;
  /** Current value */
  value: number;
  /** Minimum range */
  min: number;
  /** Maximum range */
  max: number;
  /** Increment step (e.g., 0.01 for smooth precision) */
  step?: number;
  /** Callback for value changes */
  onChange: (value: number) => void;
  /** Optional unit suffix (e.g., '%', 'px') */
  unit?: string;
}

/**
 * A specialized range input for the Anirix Inspector.
 * Optimized for high-frequency updates (60fps) during 3D property manipulation.
 */
export const Slider = ({ 
  label, 
  value, 
  min, 
  max, 
  step = 0.01, 
  onChange, 
  unit = '' 
}: SliderProps) => {
  return (
    <div className="flex flex-col gap-2 w-full p-2 group">
      {/* Label Area */}
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300 transition-colors">
        <span>{label}</span>
        <span className="font-mono text-blue-400">
          {value.toFixed(2)}{unit}
        </span>
      </div>

      {/* Range Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="
          w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer 
          accent-blue-600 hover:accent-blue-500 transition-all
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(37,99,235,0.5)]
        "
      />
    </div>
  );
};