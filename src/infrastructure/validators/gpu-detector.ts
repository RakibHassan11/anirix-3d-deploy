/* --- @/infrastructure/validators/gpu-detector.ts --- */
export const detectGPU = () => {
  if (typeof window === 'undefined') return 'medium';
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  if (!gl) return 'low';
  
  const debug = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : "";
  
  if (/NVIDIA|AMD|Radeon/.test(renderer)) return 'high';
  if (/Intel|Mesa|Mobile|Apple/.test(renderer)) return 'medium';
  return 'low';
};