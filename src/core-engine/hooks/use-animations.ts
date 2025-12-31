/* --- src/core-engine/hooks/use-animations.ts --- */
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const useAnimations = (model: THREE.Group, animations: THREE.AnimationClip[]) => {
  const [mixer] = useState(() => new THREE.AnimationMixer(model));

  useEffect(() => {
    if (animations.length > 0) {
      const action = mixer.clipAction(animations[0]);
      action.play();
    }
    return () => {
      mixer.stopAllAction();
    };
  }, [mixer, animations]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return mixer;
};