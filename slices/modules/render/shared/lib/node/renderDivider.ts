import {
	domToBlob,
	type Options as ModernScreenshotOptions,
} from "modern-screenshot";
import { mergeDeepRight } from "ramda";
import type Vips from "wasm-vips";
import type { DPI } from "@/modules/print/shared/model";
import { isSafari } from "@/shared/config";
import type { BoxSize, Side } from "@/shared/model";
import {
	defaultVipsTransformRecord,
	defaultWriteOptionsRecord,
} from "../../config";
import type {
	ImageFormat,
	VipsTransformRecord,
	VipsWriteOptionsRecord,
} from "../../model";
import { applyMultipleVipsTransforms, getVips } from "../vips";
import { transformVipsStep as step, writeVipsBuffer } from "../vips/process";
import { getDividerNodeById } from "./getDividerNodeById";
import { getNodeCaptureScale } from "./getNodeCaptureScale";
import {
	nextAnimationFrame,
	waitForDividerNodePaintReady,
	waitForDividerRenderPaint,
} from "./waitForDividerCapture";

export type RenderDividerOptions = {
	dividerId: string;
	side?: Side;
	dpi: DPI;
	imageFormat: ImageFormat;
	size: BoxSize;
	renderOptions?: ModernScreenshotOptions;
	transformRecord?: Partial<VipsTransformRecord>;
	writeOptionsRecord?: VipsWriteOptionsRecord;
};

export const renderDivider = async ({
	dividerId,
	side,
	dpi,
	size,
	renderOptions,
	writeOptionsRecord = defaultWriteOptionsRecord,
	imageFormat,
	transformRecord = defaultVipsTransformRecord,
}: RenderDividerOptions) => {
	await waitForDividerRenderPaint();

	const record = mergeDeepRight(
		defaultVipsTransformRecord,
		transformRecord,
	) as VipsTransformRecord;

	const transforms =
		record[imageFormat] ?? defaultVipsTransformRecord[imageFormat];
	const writeOptions = writeOptionsRecord[imageFormat];
	const node = getDividerNodeById({
		id: dividerId,
		side,
	});

	await waitForDividerNodePaintReady(node);

	// `modern-screenshot` captures at CSS pixel resolution by default (`scale: 1`).
	// That makes output quality depend on on-screen preview sizing (e.g. preview zoom),
	// especially on high-DPR mobile devices. The library documents:
	// DPI = 96 * scale (see `modern-screenshot/dist/index.d.ts`).
	const nodeRect = (node as HTMLElement).getBoundingClientRect();
	const maxCanvas = 60_000;
	const captureScale = getNodeCaptureScale({
		dpi,
		nodeRect,
		size,
		maximumCanvasSize: maxCanvas,
	});

	const options: ModernScreenshotOptions = {
		...renderOptions,
		maximumCanvasSize: renderOptions?.maximumCanvasSize ?? maxCanvas,
		scale: captureScale,
	};

	// WebKit: first raster of a node is often solid black; a throwaway capture fixes it.
	if (isSafari) {
		await domToBlob(node, options);
		await nextAnimationFrame();
		await nextAnimationFrame();
	}

	const blob = await domToBlob(node, options);

	const arrayBuffer = await blob.arrayBuffer();

	const vips = await getVips();
	let image: Vips.Image | null = vips.Image.newFromBuffer(arrayBuffer);

	// Ensure output dimensions match requested `size` exactly.
	// Different browsers/DPIs can produce slightly different raster sizes from the same node.
	// If we scale only by width, vertical drift accumulates and overlays (icons/text) no longer align.
	const scaleX = size.width / image.width;
	const scaleY = size.height / image.height;
	image = await step(image, async (image) => {
		return image.resize(scaleX, { vscale: scaleY });
	});

	image = await applyMultipleVipsTransforms({
		image,
		dpi,
		transforms,
	});

	const contents = writeVipsBuffer({
		image,
		options: {
			imageFormat,
			writeOptions,
		},
	});

	image.delete();
	image = null;

	return contents;
};
