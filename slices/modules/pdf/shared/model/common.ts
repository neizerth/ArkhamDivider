import type {
	DividerLayout,
	DividerWithRelations,
	InvestigatorDividerParams,
	PlayerDividerParams,
	ScenarioDividerParams,
} from "@/modules/divider/shared/model";
import type { DPI } from "@/modules/print/shared/model";
import type { BoxSize } from "@/shared/model";
import type { PDFIconService, PDFTextService, PDFUnitService } from "../lib";

export type PDFDividerProps = DividerWithRelations;
export type PDFDividerContext = {
	dpi: DPI;
	doc: PDFKit.PDFDocument;
	text: PDFTextService;
	icon: PDFIconService;
	unit: PDFUnitService;
	layout: DividerLayout;
	bleedEnabled: boolean;
	language: string;
	scenarioParams: Partial<ScenarioDividerParams>;
	playerParams: Partial<PlayerDividerParams>;
	investigatorParams: Partial<InvestigatorDividerParams>;
};

export type PDFDivider<T = void> = (
	props: PDFPageLayoutItem<DividerWithRelations<T>>,
	context: PDFDividerContext,
) => Promise<void>;

export type PDFPageLayoutItem<T> = T & {
	size: BoxSize;
	position: { x: number; y: number };
};
