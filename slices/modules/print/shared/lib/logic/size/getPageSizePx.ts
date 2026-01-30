import type { DPI, PageFormat } from "../../../model";

type Options = {
	pageFormat: PageFormat;
	dpi: DPI;
};

export const getPageSizePx = (options: Options) => {
	const { pageFormat, dpi } = options;
	return pageFormat.size[dpi];
};
