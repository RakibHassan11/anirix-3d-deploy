/* --- src/core-engine/core/exporter.ts --- */
import * as THREE from 'three';

/**
 * Captures the current frame of the renderer and triggers a download.
 */
export const exportScreenshot = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera
) => {
  const canvas = renderer.domElement;

  // Type guard: Ensure we are dealing with a standard browser canvas
  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error("Screenshot failed: Renderer is not using an HTMLCanvasElement.");
    return;
  }

  // Force a render pass to ensure the drawing buffer is current
  renderer.render(scene, camera);

  const link = document.createElement('a');
  link.setAttribute('download', `anirix-capture-${Date.now()}.png`);
  
  // toDataURL is now safe to call
  const dataURL = canvas.toDataURL('image/png');
  link.setAttribute('href', dataURL.replace('image/png', 'image/octet-stream'));
  
  link.click();
};