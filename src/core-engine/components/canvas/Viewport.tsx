/* --- src/core-engine/components/canvas/Viewport.tsx --- */
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

export const Viewport = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas 
      shadows 
      /* 🆕 Move camera higher (Y=6) so we look down, or keep it lower to see it 'below' center */
      camera={{ position: [12, 5, 12], fov: 30 }} 
      className="bg-[#050505]"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      
      <Suspense fallback={null}>
        <Environment preset="city" /> 
        {children}
        {/* 🆕 Adjust shadows to be slightly lower too */}
       <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={20} blur={2} />
      </Suspense>

      {/* 🆕 Target the controls slightly above the floor so the model sits 'low' */}
      <OrbitControls makeDefault target={[0, 0, 0]} minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </Canvas>
  );
};