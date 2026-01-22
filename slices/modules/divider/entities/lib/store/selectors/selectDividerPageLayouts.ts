import { createSelector } from "@reduxjs/toolkit";
import { selectDividers, selectLayout } from "@/modules/divider/shared/lib";
import {
	selectDoubleSidePrintEnabled,
	selectPageLayoutGrid,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";
import { getDividerPageLayouts } from "../../logic";

export const selectDividerPageLayouts = createSelector(
	[
		selectDividers,
		selectLayout,
		selectDoubleSidePrintEnabled,
		selectSingleItemPerPage,
		selectPageLayoutGrid,
	],
	(dividers, layout, doubleSided, singleItemPerPage, layoutGrid) => {
		if (!layout || !layoutGrid || !dividers) {
			return [];
		}
		return getDividerPageLayouts({
			dividers,
			doubleSided,
			singleItemPerPage,
			layoutGrid,
		});
	},
);
