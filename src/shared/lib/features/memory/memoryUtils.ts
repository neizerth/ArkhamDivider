/**
 * Utility functions for memory management and cleanup
 */

/**
 * Forces garbage collection if available in the runtime
 */
export const forceGarbageCollection = (): void => {
  if (typeof globalThis.gc === 'function') {
    globalThis.gc();
  }
};

/**
 * Safely closes a blob if it has a close method
 */
export const closeBlob = (blob: Blob): void => {
  if ('close' in blob && typeof blob.close === 'function') {
    blob.close();
  }
};

/**
 * Safely destroys an object if it has a destroy method
 */
export const destroyObject = (obj: unknown): void => {
  if (obj && typeof obj === 'object' && 'destroy' in obj && typeof obj.destroy === 'function') {
    obj.destroy();
  }
};
