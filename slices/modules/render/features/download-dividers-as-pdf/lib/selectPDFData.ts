import { createSelector } from "@reduxjs/toolkit";
import { selectLanguage } from "@/modules/core/i18n/shared/lib";
import { selectIcons } from "@/modules/core/icon/shared/lib";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import {
	selectBleedSize,
	selectCategoryId,
} from "@/modules/divider/shared/lib";
import {
	selectDoubleSidePrintEnabled,
	selectOrientedPageFormat,
	selectPageLayoutGrid,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";

export const selectPDFData = createSelector(
	[
		selectIcons,
		selectBleedSize,
		selectLanguage,
		selectCategoryId,
		selectOrientedPageFormat,
		selectPageLayoutGrid,
		selectDoubleSidePrintEnabled,
		selectSingleItemPerPage,
		selectDividersWithRelations,
	],
	(
		icons,
		bleedSize,
		language,
		categoryId,
		orientedPageFormat,
		pageLayoutGrid,
		doubleSidePrintEnabled,
		singleItemPerPage,
	) => {
		return {
			icons,
			bleedSize,
			language,
			categoryId,
			orientedPageFormat,
			pageLayoutGrid,
			doubleSidePrintEnabled,
			singleItemPerPage,
		};
	},
);
