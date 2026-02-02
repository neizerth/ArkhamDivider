import { selectLanguage } from "@/modules/core/i18n/shared/lib";
import { selectIcons } from "@/modules/core/icon/shared/lib";
import { selectLayout } from "@/modules/divider/entities/lib";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import {
	selectBleedEnabled,
	selectDoubleSidePrintEnabled,
	selectOrientedPageFormat,
	selectPageLayoutGrid,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";
import type { AppSelector, RootState } from "@/shared/store";

function selectPDFDataImpl(state: RootState) {
	const icons = selectIcons(state);
	const language = selectLanguage(state);
	const layout = selectLayout(state);
	const pageFormat = selectOrientedPageFormat(state);
	const layoutGrid = selectPageLayoutGrid(state);
	const doubleSided = selectDoubleSidePrintEnabled(state);
	const singleItemPerPage = selectSingleItemPerPage(state);
	const dividers = selectDividersWithRelations(state);
	const bleedEnabled = selectBleedEnabled(state);

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
}

export type PDFData = ReturnType<typeof selectPDFDataImpl>;

export const selectPDFData: AppSelector<PDFData> = selectPDFDataImpl;
