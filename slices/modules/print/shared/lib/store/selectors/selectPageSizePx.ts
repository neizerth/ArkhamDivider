import { createSelector } from "@reduxjs/toolkit";
import { selectDPI } from "../print";
import { selectPageFormat } from "./selectPageFormat";

export const selectPageSizePx = createSelector(
	[selectPageFormat, selectDPI],
	(pageFormat, dpi) => {
		if (!pageFormat) {
			return;
		}
		return pageFormat.size[dpi];
	},
);
