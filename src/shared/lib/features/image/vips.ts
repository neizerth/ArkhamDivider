import { Nullable } from "@/shared/types/util";
import Vips from "wasm-vips";

let vips: Nullable<typeof Vips> = null;

const Kb = 1024;

const Mb = Kb * 1024;

const MAX_MEMORY = 128;

export const getVips = async () => {
  const memoryUsage = vips ? vips.Stats.mem() / Mb : 0;

  if (memoryUsage > MAX_MEMORY) {
    vips = null;
  }

  if (!vips) {
    vips = await Vips();
    vips.Cache.maxMem(128 * Mb);
  }

  return vips;
};
