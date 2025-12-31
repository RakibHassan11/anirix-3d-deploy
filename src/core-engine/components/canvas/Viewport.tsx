/* --- src/core-engine/components/canvas/Viewport.tsx --- */
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment } from '@react-three/drei';

export const Viewport = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
      {/* Stage provides automatic lighting and centering */}
      <Stage intensity={0.5} environment="city" adjustCamera={true}>
        {children}
      </Stage>
      <OrbitControls makeDefault />
    </Canvas>
  );
};