/**
 * Browser tests for applyColorFilterToNode.
 *
 * Runs inside real Chromium via Vitest browser mode (Playwright provider).
 * Run: npm run color-filter:test
 */

import { page } from "@vitest/browser/context";
import { describe, expect, it } from "vitest";
import { arkhamIndexBackgroundFilters } from "@/modules/divider/entities/items/arkham-index/config/colors";
import { loadImage } from "@/shared/util/dom";
import { applyColorFilterToNode } from "../applyColorFilterToNode";
import coreAvifUrl from "./snapshots/core.avif?url";
import dwlAvifUrl from "./snapshots/dwl.avif?url";
import eoeAvifUrl from "./snapshots/eoe.avif?url";
import fhvAvifUrl from "./snapshots/fhv.avif?url";
import ptcAvifUrl from "./snapshots/ptc.avif?url";
import tcuAvifUrl from "./snapshots/tcu.avif?url";
import tdcAvifUrl from "./snapshots/tdc.avif?url";
import tdeAvifUrl from "./snapshots/tde.avif?url";
import tfaAvifUrl from "./snapshots/tfa.avif?url";
import ticAvifUrl from "./snapshots/tic.avif?url";
import tskAvifUrl from "./snapshots/tsk.avif?url";

// ── Helpers ───────────────────────────────────────────────────────────────────

const CORE_W = 2000;
const CORE_H = 2849;

/** Load an image at natural size and mount it in the document for canvas rendering. */
async function mountImage(src: string): Promise<HTMLImageElement> {
	const img = await loadImage({ src, width: CORE_W, height: CORE_H });
	document.body.appendChild(img);
	return img;
}

/** Render an image element (with its current style.filter) to a base64 PNG. */
function renderToBase64(img: HTMLImageElement): string {
	const canvas = document.createElement("canvas");
	canvas.width = CORE_W;
	canvas.height = CORE_H;
	const ctx = canvas.getContext("2d")!;
	if (img.style.filter) {
		ctx.filter = img.style.filter;
	}
	ctx.drawImage(img, 0, 0);
	return canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");
}

/**
 * Capture pixel data for an image element using Vitest browser's screenshot
 * API. The browser composites the full CSS filter stack (including SVG url()
 * colorBalance references) before we read pixels.
 * Returns raw RGBA data as a Uint8ClampedArray.
 */
async function capturePixels(
	img: HTMLImageElement,
): Promise<Uint8ClampedArray> {
	if (!img.isConnected) {
		document.body.appendChild(img);
	}
	// Give the browser a frame to paint with the CSS filter applied
	await new Promise<void>((r) => requestAnimationFrame(() => r()));

	const locator = page.elementLocator(img);
	// screenshot() returns a base64 string (no path arg → base64 mode)
	const { base64 } = await locator.screenshot({ base64: true });

	// Decode base64 PNG → ImageBitmap → canvas pixels
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	const bmp = await createImageBitmap(new Blob([bytes], { type: "image/png" }));

	const offscreen = new OffscreenCanvas(CORE_W, CORE_H);
	const ctx = offscreen.getContext("2d")!;
	ctx.drawImage(bmp, 0, 0, CORE_W, CORE_H);
	bmp.close();
	return ctx.getImageData(0, 0, CORE_W, CORE_H).data;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("applyColorFilterToNode", () => {
	it("empty filter [] sets style.filter to empty string", async () => {
		const img = await mountImage(coreAvifUrl);
		applyColorFilterToNode(img, []);
		expect(img.style.filter).toBe("");
		img.remove();
	});

	/**
	 * Baseline: the original image rendered without any filter.
	 * All other filter tests compare against this snapshot.
	 */
	it("baseline — original image, no filter", async () => {
		const img = await mountImage(coreAvifUrl);
		expect(renderToBase64(img)).toMatchSnapshot("core");
		img.remove();
	});

	/**
	 * Empty filter must produce a result visually identical to the original.
	 */
	it("empty filter [] matches original image", async () => {
		const img = await mountImage(coreAvifUrl);
		applyColorFilterToNode(img, []);
		expect(renderToBase64(img)).toMatchSnapshot("core");
		img.remove();
	});

	// ── Per-campaign filter tests ────────────────────────────────────────────
	//
	// Each case applies the campaign filter to core.avif and compares the
	// per-channel average against the Photoshop-exported reference image.
	//
	// Pixel capture uses Playwright's screenshot API so the full CSS filter
	// stack (including SVG url() colorBalance references) is composited by the
	// browser before we read the pixel data.
	//
	// Tolerance is 4 units per channel: CSS hue-rotate (sRGB matrix) and PS
	// HSL hue operate in different colour spaces, so ~3 units of channel drift
	// is expected even with perfectly tuned coefficients.

	/** Assert that the per-channel average of `actual` is within `tolerance` of `expected`. */
	async function assertFilterMatchesRef(
		srcUrl: string,
		refUrl: string,
		filterId: string,
		tolerance: number,
	): Promise<void> {
		const [src, ref] = await Promise.all([
			mountImage(srcUrl),
			mountImage(refUrl),
		]);

		applyColorFilterToNode(
			src,
			arkhamIndexBackgroundFilters.campaign[filterId],
		);

		const [actualPx, expectedPx] = await Promise.all([
			capturePixels(src),
			capturePixels(ref),
		]);

		let [rA, gA, bA, rE, gE, bE] = [0, 0, 0, 0, 0, 0];
		const N = CORE_W * CORE_H;
		for (let i = 0; i < actualPx.length; i += 4) {
			rA += actualPx[i];
			gA += actualPx[i + 1];
			bA += actualPx[i + 2];
			rE += expectedPx[i];
			gE += expectedPx[i + 1];
			bE += expectedPx[i + 2];
		}
		const avg = (s: number) => (s / N).toFixed(1);
		console.log(`  actual   R/G/B: ${avg(rA)} ${avg(gA)} ${avg(bA)}`);
		console.log(`  expected R/G/B: ${avg(rE)} ${avg(gE)} ${avg(bE)}`);
		expect(Math.abs(rA - rE) / N, "R avg delta").toBeLessThan(tolerance);
		expect(Math.abs(gA - gE) / N, "G avg delta").toBeLessThan(tolerance);
		expect(Math.abs(bA - bE) / N, "B avg delta").toBeLessThan(tolerance);

		src.remove();
		ref.remove();
	}

	const FILTER_CASES: Array<{ id: string; refUrl: string }> = [
		{ id: "dwl", refUrl: dwlAvifUrl },
		{ id: "ptc", refUrl: ptcAvifUrl },
		{ id: "tfa", refUrl: tfaAvifUrl },
		{ id: "tcu", refUrl: tcuAvifUrl },
		{ id: "tde", refUrl: tdeAvifUrl },
		{ id: "tic", refUrl: ticAvifUrl },
		{ id: "eoe", refUrl: eoeAvifUrl },
		{ id: "tsk", refUrl: tskAvifUrl },
		{ id: "fhv", refUrl: fhvAvifUrl },
		{ id: "tdc", refUrl: tdcAvifUrl },
	];

	for (const { id, refUrl } of FILTER_CASES) {
		it(`${id} filter matches reference`, async () => {
			await assertFilterMatchesRef(coreAvifUrl, refUrl, id, 4);
		});
	}
});
