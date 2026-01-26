import { createSelector } from "@reduxjs/toolkit";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import { selectLayout } from "@/modules/divider/shared/lib";
import {
	selectDoubleSidePrintEnabled,
	selectPageLayoutGrid,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";
import { getDividerPageLayouts } from "../../logic";

export const selectDividerPageLayouts = createSelector(
	[
		selectDividersWithRelations,
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
