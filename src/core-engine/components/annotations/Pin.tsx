/* --- src/core-engine/components/annotations/Pin.tsx --- */
'use client';
import React from 'react';
import { Html } from '@react-three/drei';

export const Pin = ({ position, label }: { position: [number, number, number], label: string }) => (
  <Html position={position} center>
    <div className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-lg">
      {label}
    </div>
  </Html>
);
