import { PAGE_TOP_PADDING } from "../../../config";
import type { DPI, PageFormat, PageLayout } from "../../../model";
import { fromDPI } from "../../util";
import { getLayoutSizePx } from "./getLayoutSizePx";
import { getPageSize } from "./getPageSize";
import { getUnitSizePx } from "./getUnitSizePx";

type Options<T> = {
	pageLayout: PageLayout<T>;
	pageFormat: PageFormat;
	dpi: DPI;
	singleItemPerPage?: boolean;
	cropmarksEnabled?: boolean;
};

export const getPageLayoutOffsetPx = <T>(options: Options<T>) => {
	const { dpi, pageLayout, pageFormat, singleItemPerPage, cropmarksEnabled } =
		options;

	if (singleItemPerPage && !cropmarksEnabled) {
		return { x: 0, y: 0 };
	}
	const unitSize = getUnitSizePx({
		unitSize: pageLayout.grid.unitSize,
		dpi,
	});

	const pageSize = getPageSize({
		units: "px",
		dpi,
		pageFormat,
		unitSize,
		singleItemPerPage,
		cropmarksEnabled,
	});

	const layoutSize = getLayoutSizePx({ pageLayout, dpi });

	const x = (pageSize.width - layoutSize.width) / 2;

	if (!pageLayout.isLast) {
		const y = (pageSize.height - layoutSize.height) / 2;

		return { x, y };
	}
	const mm = fromDPI(dpi);

	const y = mm(PAGE_TOP_PADDING);

	return { x, y };
};
