import { createSelector } from "@reduxjs/toolkit";
import { selectLayout } from "@/modules/divider/entities/lib/store/selectors/selectLayout";
import {
	getPageFormat,
	selectPageMargin,
	selectPageSize,
} from "@/modules/print/shared/lib";
import { getDividerLayoutGrid } from "../../logic";

export const selectDividerLayoutGrid = createSelector(
	[selectLayout, selectPageSize, selectPageMargin],
	(layout, pageSize, pageMargin) => {
		const pageFormat = getPageFormat(pageSize);
		if (!layout || !pageFormat) {
			return null;
		}
		return getDividerLayoutGrid({
			layout,
			pageFormat,
			pageMargin,
		});
	},
);
