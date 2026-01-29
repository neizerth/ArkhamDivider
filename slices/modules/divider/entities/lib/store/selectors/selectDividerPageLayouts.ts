import { createSelector } from "@reduxjs/toolkit";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import {
	selectDoubleSidePrintEnabled,
	selectPageLayoutGrid,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";
import { getDividerPageLayouts } from "../../logic";

export const selectDividerPageLayouts = createSelector(
	[
		selectDividersWithRelations,
		selectDoubleSidePrintEnabled,
		selectSingleItemPerPage,
		selectPageLayoutGrid,
	],
	(dividers, doubleSided, singleItemPerPage, layoutGrid) => {
		if (!layoutGrid || !dividers) {
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
