import type { BoxPosition } from "@/shared/model";
import type { DPI, PageFormat, PageLayout } from "../../../model";
import { fromDPI } from "../../util";
import { getPagePaddingTop } from "../getPagePaddingTop";
import { getLayoutSizePx } from "./getLayoutSizePx";
import { getPageSize } from "./getPageSize";
import { getUnitSizePx } from "./getUnitSizePx";

type Options<T> = {
	pageLayout: PageLayout<T>;
	pageFormat: PageFormat;
	dpi: DPI;
	singleItemPerPage?: boolean;
	cropmarksEnabled?: boolean;
	pagePadding: BoxPosition;
};

export const getPageLayoutOffsetPx = <T>(options: Options<T>) => {
	const {
		dpi,
		pageLayout,
		pageFormat,
		singleItemPerPage,
		cropmarksEnabled,
		pagePadding,
	} = options;

	if (singleItemPerPage && !cropmarksEnabled) {
		return { x: pagePadding.left, y: pagePadding.top };
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

	const x = pagePadding.left + (pageSize.width - layoutSize.width) / 2;

	if (!pageLayout.isLast) {
		const y = pagePadding.top + (pageSize.height - layoutSize.height) / 2;

		return { x, y };
	}
	const mm = fromDPI(dpi);

	const minPaddingTop = getPagePaddingTop({
		pageSize,
		areaSize: layoutSize,
		isLast: pageLayout.isLast,
	});

	const paddingTop = Math.max(minPaddingTop, pagePadding.top);

	const y = mm(paddingTop);

	return { x, y };
};
