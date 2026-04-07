type CreateVips = typeof import("wasm-vips");
type VipsInstance = Awaited<ReturnType<CreateVips>>;

let vips: VipsInstance | null = null;

export const getVips = async (): Promise<VipsInstance> => {
	if (vips) {
		return vips;
	}
	// wasm-vips pthreads need SharedArrayBuffer; Safari only gets that with true
	// cross-origin isolation (COOP + COEP require-corp). COEP credentialless is
	// not enough on WebKit — worker init then throws DataCloneError.
	if (
		typeof globalThis !== "undefined" &&
		"crossOriginIsolated" in globalThis &&
		globalThis.crossOriginIsolated === false
	) {
		throw new Error(
			"wasm-vips requires a cross-origin isolated page (COOP/COEP, use require-corp).",
		);
	}
	const module = await import("wasm-vips");
	const Vips = module.default as CreateVips;
	vips = await Vips();
	return vips;
};
