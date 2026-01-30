import { PAGE_TOP_PADDING } from "../../../config";
import type { DPI, PageFormat, PageLayout } from "../../../model";
import { fromDPI } from "../../util";
import { getLayoutSizePx } from "./getLayoutSizePx";
import { getPageSizePx } from "./getPageSizePx";

type Options<T> = {
	pageLayout: PageLayout<T>;
	pageFormat: PageFormat;
	dpi: DPI;
};

export const getPageLayoutOffsetPx = <T>(options: Options<T>) => {
	const { dpi, pageLayout, pageFormat } = options;
	const pageSize = getPageSizePx({ pageFormat, dpi });
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
