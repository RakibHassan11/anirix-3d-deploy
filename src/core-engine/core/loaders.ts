import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'meshoptimizer';

export const configureGLTFLoader = (renderer: THREE.WebGLRenderer) => {
  // Local Draco (Reliable)
  const dracoLoader = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
  
  // Local Basis (This fixes the "blob" error)
  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('/basis/') 
    .detectSupport(renderer);

  return (loader: GLTFLoader) => {
    loader.setDRACOLoader(dracoLoader);
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder); 
  };
};