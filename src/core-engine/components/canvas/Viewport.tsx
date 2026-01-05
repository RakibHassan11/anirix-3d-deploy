/* --- src/core-engine/components/canvas/Viewport.tsx --- */
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { Suspense } from 'react';

export const Viewport = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full relative" style={{ background: 'radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)' }}>
      <Canvas 
        camera={{ position: [8, 4, 8], fov: 20 }} 
        className="bg-transparent"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        
        <Suspense fallback={null}>
          <Environment preset="city" /> 
          
          {children}

          <Grid
            infiniteGrid
            fadeDistance={30}
            fadeStrength={5}
            cellSize={0.5}
            sectionSize={2.5}
            sectionThickness={1}
            sectionColor="#1caad9"
            cellColor="#222"
            cellThickness={0.5}
            /* 🚀 ADJUSTED POSITION: Try -0.65 for a precise fit */
            position={[0, -0.85, 0]} 
          />
        </Suspense>

        <OrbitControls makeDefault target={[0, 0, 0]} enableDamping />
      </Canvas>
    </div>
  );
};