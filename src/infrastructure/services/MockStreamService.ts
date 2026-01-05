/* --- src/infrastructure/services/MockStreamService.ts --- */

export class MockStreamService {
  /**
   * TRUE STREAMING: An Async Generator that yields chunks as they arrive.
   * This allows the 3D model to begin "Hydrating" before the download ends.
   */
  static async *stream(url: string, onProgress: (p: number) => void) {
    const response = await fetch(url);
    if (!response.body) throw new Error('ReadableStream not supported');

    const reader = response.body.getReader();
    // Fallback to 10MB if Content-Length is missing (common on localhost)
    const contentLength = +(response.headers.get('Content-Length') ?? 10000000);
    
    let receivedLength = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      receivedLength += value.length;
      
      // Update global progress state
      const progress = Math.min((receivedLength / contentLength) * 100, 99);
      onProgress(progress);

      // 🆕 THE MAGIC: Yield the chunk immediately to the Model component
      yield value;

      // Small delay to simulate network latency and see the progressive LOD sharpening
      await new Promise(r => setTimeout(r, 30));
    }

    onProgress(100);
  }

  /**
   * Keep the legacy method for standard non-streaming fetches if needed
   */
  static async fetchSimulatedStream(url: string, onProgress: (p: number) => void): Promise<ArrayBuffer> {
    const response = await fetch(url);
    const reader = response.body?.getReader();
    const total = +(response.headers.get('Content-Length') ?? 10000000);
    
    let received = 0;
    const chunks: Uint8Array[] = [];

    while(true) {
      const {done, value} = await reader!.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      onProgress((received / total) * 100);
      await new Promise(r => setTimeout(r, 20));
    }

    const combined = new Uint8Array(received);
    let position = 0;
    for(const chunk of chunks) {
      combined.set(chunk, position);
      position += chunk.length;
    }
    return combined.buffer;
  }
}