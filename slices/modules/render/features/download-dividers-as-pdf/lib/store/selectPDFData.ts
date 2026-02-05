import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { selectIcons } from "@/modules/core/icon/shared/lib";
import { selectLayout } from "@/modules/divider/entities/lib";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import {
	selectInvestigatorParams,
	selectPlayerParams,
	selectScenarioParams,
} from "@/modules/divider/shared/lib";
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
	const language = selectCurrentLanguage(state);
	const layout = selectLayout(state);
	const pageFormat = selectOrientedPageFormat(state);
	const layoutGrid = selectPageLayoutGrid(state);
	const doubleSided = selectDoubleSidePrintEnabled(state);
	const singleItemPerPage = selectSingleItemPerPage(state);
	const dividers = selectDividersWithRelations(state);
	const bleedEnabled = selectBleedEnabled(state);
	const scenarioParams = selectScenarioParams(state);
	const playerParams = selectPlayerParams(state);
	const investigatorParams = selectInvestigatorParams(state);
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
		scenarioParams,
		playerParams,
		investigatorParams,
	};
}

export type PDFData = ReturnType<typeof selectPDFDataImpl>;

export const selectPDFData: AppSelector<PDFData> = selectPDFDataImpl;
