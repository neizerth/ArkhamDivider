type CreateVips = typeof import("wasm-vips");
type VipsInstance = Awaited<ReturnType<CreateVips>>;

let vips: VipsInstance | null = null;

const isCrossOriginIsolated = () =>
	typeof globalThis !== "undefined" &&
	"crossOriginIsolated" in globalThis &&
	globalThis.crossOriginIsolated === true;

/**
 * wasm-vips pthreads need `SharedArrayBuffer`. With COEP `require-corp`,
 * `crossOriginIsolated` should be true in supporting browsers; we still probe
 * SAB allocation for engines that only expose the primitive when usable.
 */
const canUseSharedArrayBuffer = () => {
	if (typeof SharedArrayBuffer === "undefined") {
		return false;
	}
	try {
		new SharedArrayBuffer(1);
		return true;
	} catch {
		return false;
	}
};

export const getVips = async (): Promise<VipsInstance> => {
	if (vips) {
		return vips;
	}
	if (!isCrossOriginIsolated() && !canUseSharedArrayBuffer()) {
		throw new Error(
			"wasm-vips needs SharedArrayBuffer (COOP: same-origin + COEP require-corp). Ensure the document is cross-origin isolated (headers on the HTML response) or use the coi-serviceworker flow from index.html for static hosts.",
		);
	}
	const module = await import("wasm-vips");
	const Vips = module.default as CreateVips;
	vips = await Vips();
	return vips;
};
