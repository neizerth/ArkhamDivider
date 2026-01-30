import { createSelector } from "@reduxjs/toolkit";
import { selectLanguage } from "@/modules/core/i18n/shared/lib";
import { selectIcons } from "@/modules/core/icon/shared/lib";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import { selectLayout } from "@/modules/divider/shared/lib";
import {
	selectBleedEnabled,
	selectDoubleSidePrintEnabled,
	selectOrientedPageFormat,
	selectPageLayoutGrid,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";

export const selectPDFData = createSelector(
	[
		selectIcons,
		selectLanguage,
		selectLayout,
		selectOrientedPageFormat,
		selectPageLayoutGrid,
		selectDoubleSidePrintEnabled,
		selectSingleItemPerPage,
		selectDividersWithRelations,
		selectBleedEnabled,
	],
	(
		icons,
		language,
		layout,
		pageFormat,
		layoutGrid,
		doubleSided,
		singleItemPerPage,
		dividers,
		bleedEnabled,
	) => {
		return {
			icons,
			language,
			layout,
			pageFormat,
			layoutGrid,
			doubleSided,
			singleItemPerPage,
			dividers,
			bleedEnabled,
		};
	},
);
