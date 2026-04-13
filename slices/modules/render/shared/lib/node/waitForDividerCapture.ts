import { isSafari } from "@/shared/config";

/**
 * After `setDividerRenderId`, give React a paint before `getDividerNodeById` + capture.
 */
export const waitForDividerRenderPaint = (): Promise<void> =>
	new Promise((resolve) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				resolve();
			});
		});
	});

export const nextAnimationFrame = (): Promise<void> =>
	new Promise((resolve) => {
		requestAnimationFrame(() => resolve());
	});

/**
 * Before `domToBlob` / raster: scroll into view (WebKit often skips offscreen layers),
 * fonts, decoded images, layout flush, compositor (Safari often needs an extra frame).
 */
export const waitForDividerNodePaintReady = async (
	node: Element,
): Promise<void> => {
	const el = node as HTMLElement;
	try {
		el.scrollIntoView({ block: "center", inline: "nearest" });
	} catch {
		// ignore
	}

	if (
		typeof document !== "undefined" &&
		"fonts" in document &&
		document.fonts
	) {
		try {
			await document.fonts.ready;
		} catch {
			// ignore
		}
	}

	const imgs = node.querySelectorAll("img");
	for (const img of imgs) {
		if (!img.complete) {
			await new Promise<void>((resolve) => {
				img.addEventListener("load", () => resolve(), { once: true });
				img.addEventListener("error", () => resolve(), { once: true });
			});
		}
		try {
			await img.decode();
		} catch {
			// ignore
		}
	}

	void el.offsetWidth;

	await nextAnimationFrame();
	await nextAnimationFrame();
	//** Safari often needs an extra frame */
	if (isSafari) {
		await nextAnimationFrame();
	}
};
