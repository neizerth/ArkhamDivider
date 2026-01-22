import { createSelector } from "@reduxjs/toolkit";
import { rotateBoxSize } from "@/shared/util";
import { selectOrientation } from "../print";
import { selectPageFormat } from "./selectPageFormat";

export const selectOrientedPageFormat = createSelector(
	[selectPageFormat, selectOrientation],
	(pageFormat, orientation) => {
		if (!pageFormat) {
			return;
		}
		if (orientation === "portrait") {
			return pageFormat;
		}
		return {
			...pageFormat,
			size: {
				mm: rotateBoxSize(pageFormat.size.mm),
				px: rotateBoxSize(pageFormat.size.px),
			},
		};
	},
);
