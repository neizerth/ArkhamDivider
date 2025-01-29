import type { Nullable } from "@/shared/model/types/util";
import Vips from "wasm-vips";

let vips: Nullable<typeof Vips> = null;

export const getVips = async () => {
	if (!vips) {
		vips = await Vips();
	}
	return vips;
};
