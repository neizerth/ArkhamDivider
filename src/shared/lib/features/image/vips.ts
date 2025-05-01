import { Nullable } from "@/shared/types/util";
import Vips from "wasm-vips";

let vips: Nullable<typeof Vips> = null;

const Mb = 1024;

export const getVips = async () => {
  if (!vips) {
    vips = await Vips();
    vips.Cache.maxMem(128 * Mb);
  }
  return vips;
};
