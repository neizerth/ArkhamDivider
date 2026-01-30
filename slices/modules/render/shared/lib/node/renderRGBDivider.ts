import {
	domToPng,
	type Options as ModernScreenshotOptions,
} from "modern-screenshot";
import type { DPI } from "@/modules/print/shared/model";
import { getDividerNodeById } from "./getDividerNodeById";

type Options = {
	dividerId: string;
	dpi: DPI;
	renderOptions?: ModernScreenshotOptions;
};
export const renderRGBDivider = async ({
	dividerId,
	dpi,
	renderOptions,
}: Options) => {
	const node = getDividerNodeById(dividerId);
	const scale = dpi / 96;
	const options = {
		...renderOptions,
		scale,
	};

	return domToPng(node, options);
};
