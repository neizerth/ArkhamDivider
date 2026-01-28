import {
	domToPng,
	type Options as ModernScreenshotOptions,
} from "modern-screenshot";
import type { DPI } from "@/modules/print/shared/model";

type Options = {
	node: Element;
	dpi: DPI;
	renderOptions?: ModernScreenshotOptions;
};
export const renderDividerNode = async ({
	node,
	dpi,
	renderOptions,
}: Options) => {
	const scale = dpi / 96;
	const options = {
		...renderOptions,
		scale,
	};

	return domToPng(node, options);
};
