import type Vips from 'wasm-vips';
import { Nullable } from '@/shared/types/util';
import { forceGarbageCollection } from '../memory/memoryUtils';

let vips: Nullable<typeof Vips> = null;

const Kb = 1024;

const Mb = Kb * 1024;

const MAX_MEMORY = 128;

export const getVips = async () => {
  const memoryUsage = vips ? vips.Stats.mem() / Mb : 0;

  if (memoryUsage > MAX_MEMORY) {
    forceGarbageCollection();
    vips = null;
  }

  if (!vips) {
    const { default: Vips } = await import('wasm-vips');
    vips = await Vips();
    vips.Cache.maxMem(128 * Mb);
  }

  return vips;
};

export const cleanupVips = () => {
  if (vips) {
    forceGarbageCollection();
    vips = null;
  }
};
