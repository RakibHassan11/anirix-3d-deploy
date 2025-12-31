/* --- src/core-engine/components/stage/Environment.tsx --- */
'use client';
import { Environment as DreiEnv, ContactShadows, Float } from '@react-three/drei';
import { useViewerStore } from '@/core-engine/store/use-viewer';

export const Environment = ({ children }: { children?: React.ReactNode }) => {
  const { environment, intensity } = useViewerStore();
  
  return (
    <>
      <DreiEnv preset={environment} />
      <ambientLight intensity={intensity} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      
      {/* Provides professional "Ground Contact" shadows without a physical floor */}
      <ContactShadows 
        position={[0, -0.01, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4} 
      />
      
      {children}
    </>
  );
};