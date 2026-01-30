import { createSelector } from "@reduxjs/toolkit";
import { rotatePageFormat } from "../../logic";
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
		return rotatePageFormat(pageFormat);
	},
);
