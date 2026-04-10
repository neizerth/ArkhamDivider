type CreateVips = typeof import("wasm-vips");
type VipsInstance = Awaited<ReturnType<CreateVips>>;

let vips: VipsInstance | null = null;

export const getVips = async (): Promise<VipsInstance> => {
	if (vips) {
		return vips;
	}
	// wasm-vips pthreads need SharedArrayBuffer → cross-origin isolation (COOP + COEP).
	// We use COEP `credentialless` so third-party scripts (e.g. Metrika) can load; Chromium
	// still reports crossOriginIsolated. WebKit may differ — see COEP notes in vite/vercel config.
	if (
		typeof globalThis !== "undefined" &&
		"crossOriginIsolated" in globalThis &&
		globalThis.crossOriginIsolated === false
	) {
		throw new Error(
			"wasm-vips requires a cross-origin isolated page (COOP + COEP, e.g. same-origin + credentialless or require-corp).",
		);
	}
	const module = await import("wasm-vips");
	const Vips = module.default as CreateVips;
	vips = await Vips();
	return vips;
};
