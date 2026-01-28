import {
	domToBlob,
	type Options as ModernScreenshotOptions,
} from "modern-screenshot";
import type { DPI } from "@/modules/print/shared/model";
import type { ImageFormat } from "../../model";
import { getVips } from "../getVips";

type Options = {
	node: Element;
	dpi: DPI;
	imageFormat?: ImageFormat;
	renderOptions?: ModernScreenshotOptions;
};
export const renderCMYKDividerNode = async ({
	node,
	dpi,
	imageFormat = "png",
	renderOptions,
}: Options) => {
	const scale = dpi / 96;
	const options = {
		...renderOptions,
		scale,
	};

	const blob = await domToBlob(node, options);

	const arrayBuffer = await blob.arrayBuffer();

	const vips = await getVips();
	const image = vips.Image.newFromBuffer(arrayBuffer);
	image.iccTransform("cmyk");

	const ext = `.${imageFormat}`;

	const contents = image.writeToBuffer(ext);

	return contents;
};
