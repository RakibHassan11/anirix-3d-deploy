/* --- src/core-engine/components/canvas/Effects.tsx --- */
'use client';
import React from 'react';
import * as THREE from 'three'; // Import THREE to handle Color types
import { EffectComposer, Bloom, SSAO, Noise, Vignette } from '@react-three/postprocessing';
import { useViewerStore } from '@/core-engine/store/use-viewer';

export const Effects = () => {
  const tier = useViewerStore((s) => s.performanceTier);

  if (tier === 'low') return <></>;

  return (
    /* Fix 1: 'disableNormalPass' is now 'enableNormalPass'. 
       Set it to false to achieve the same result. 
    */
    <EffectComposer enableNormalPass={false}>
      <Bloom luminanceThreshold={1} intensity={0.5} levels={9} mipmapBlur />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      
      {tier === 'high' ? (
        <>
          {/* Fix 2: 'color' expects a THREE.Color object. 
              Wrap the string in new THREE.Color(). 
          */}
          <SSAO 
            intensity={15} 
            radius={0.05} 
            luminanceInfluence={0.5} 
            color={new THREE.Color('black')} 
          />
          <Noise opacity={0.02} />
        </>
      ) : <></>}
    </EffectComposer>
  );
};