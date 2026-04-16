import type { BoxSize } from "@/shared/model";
import { modifyRectSize } from "@/shared/util";
import { SINGLE_ITEM_CROPMARK_OFFSET as cropmarkOffset } from "../../../config";
import type { DPI, PageFormat } from "../../../model";
import { mm2px } from "../../util";

type Options = {
	pageFormat: PageFormat;
	unitSize: BoxSize;
	singleItemPerPage?: boolean;
	cropmarksEnabled?: boolean;
} & (
	| {
			units: "mm";
	  }
	| {
			units: "px";
			dpi: DPI;
	  }
);
export const getPageSize = (options: Options) => {
	const { pageFormat, unitSize, singleItemPerPage, cropmarksEnabled } = options;
	if (singleItemPerPage) {
		if (!cropmarksEnabled) {
			return unitSize;
		}
		if (options.units === "mm") {
			return modifyRectSize({ size: unitSize, value: cropmarkOffset });
		}
		const offset = mm2px(cropmarkOffset, options.dpi);

		return modifyRectSize({
			size: unitSize,
			value: offset,
		});
	}
	if (options.units === "mm") {
		return pageFormat.size.mm;
	}
	return pageFormat.size[options.dpi];
};
