import Vips from "wasm-vips";

let vips: typeof Vips | null = null;

export const getVips = async () => {
	if (vips) {
		return vips;
	}
	vips = await Vips();
	return vips;
};
