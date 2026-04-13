import {
	domToBlob,
	type Options as ModernScreenshotOptions,
} from "modern-screenshot";
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
	transformRecord?: VipsTransformRecord;
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

	const transforms = transformRecord[imageFormat];
	const writeOptions = writeOptionsRecord[imageFormat];
	const node = getDividerNodeById({
		id: dividerId,
		side,
	});

	await waitForDividerNodePaintReady(node);

	// const scale = dpi / 96;
	const options = {
		...renderOptions,
		// scale,
		maximumCanvasSize: 60_000,
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

	const scale = size.width / image.width;
	image = await step(image, async (image) => {
		return image.resize(scale);
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
