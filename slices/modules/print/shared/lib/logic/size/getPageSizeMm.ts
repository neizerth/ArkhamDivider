import type { BoxSize } from "@/shared/model";
import type { PageFormat } from "../../../model";

type Options = {
	pageFormat: PageFormat;
	/** Unit size in mm */
	unitSize: BoxSize;
	singleItemPerPage?: boolean;
};

export const getPageSizeMm = (options: Options) => {
	const { pageFormat, unitSize, singleItemPerPage } = options;
	if (singleItemPerPage) {
		return unitSize;
	}
	return pageFormat.size.mm;
};
