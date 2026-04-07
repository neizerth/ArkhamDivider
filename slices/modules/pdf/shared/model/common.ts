import type {
	DividerLayout,
	DividerWithRelations,
	InvestigatorDividerParams,
	PlayerDividerParams,
	ScenarioDividerParams,
} from "@/modules/divider/shared/model";
import type { DPI } from "@/modules/print/shared/model";
import type { BoxSize } from "@/shared/model";
import type { RootState } from "@/shared/store";
import type {
	PDFCreaseService,
	PDFIconService,
	PDFImageService,
	PDFLasercutService,
	PDFTextService,
	PDFUnitService,
} from "../lib";

export type PDFDividerProps = DividerWithRelations;
export type PDFDividerContext = {
	dpi: DPI;
	doc: PDFKit.PDFDocument;
	text: PDFTextService;
	icon: PDFIconService;
	unit: PDFUnitService;
	lasercut: PDFLasercutService;
	crease: PDFCreaseService;
	image: PDFImageService;
	layout: DividerLayout;
	bleedEnabled: boolean;
	creaseEnabled: boolean;
	language: string;
	scenarioParams: Partial<ScenarioDividerParams>;
	playerParams: Partial<PlayerDividerParams>;
	investigatorParams: Partial<InvestigatorDividerParams>;
	params?: Record<string, unknown>;
	state: RootState;
};

export type PDFDivider<T = void> = (
	props: PDFPageLayoutItem<DividerWithRelations<T>>,
	context: PDFDividerContext,
) => Promise<void>;

export type PDFPageLayoutItem<T> = T & {
	size: BoxSize;
	position: { x: number; y: number };
};
