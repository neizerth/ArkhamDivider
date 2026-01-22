import { createSelector } from "@reduxjs/toolkit";
import { selectLayout } from "@/modules/divider/shared/lib";
import { getPageFormat, selectPageSize } from "@/modules/print/shared/lib";
import { getDividerLayoutGrid } from "../../logic";

export const selectDividerLayoutGrid = createSelector(
	[selectLayout, selectPageSize],
	(layout, pageSize) => {
		const pageFormat = getPageFormat(pageSize);
		if (!layout || !pageFormat) {
			return null;
		}
		return getDividerLayoutGrid({
			layout,
			pageFormat,
		});
	},
);
