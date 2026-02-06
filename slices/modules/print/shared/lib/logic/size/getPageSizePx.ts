import type { BoxSize } from "@/shared/model";
import type { DPI, PageFormat } from "../../../model";

type Options = {
	pageFormat: PageFormat;
	dpi: DPI;
	/** Unit size in px */
	unitSize: BoxSize;
	singleItemPerPage?: boolean;
};

export const getPageSizePx = (options: Options) => {
	const { pageFormat, dpi, unitSize, singleItemPerPage } = options;
	if (singleItemPerPage) {
		return unitSize;
	}
	return pageFormat.size[dpi];
};
