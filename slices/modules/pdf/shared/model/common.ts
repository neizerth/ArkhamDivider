import type {
	DividerLayout,
	DividerWithRelations,
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
};

export type PDFDivider<T = void> = (
	props: PDFPageLayoutItem<DividerWithRelations<T>>,
	context: PDFDividerContext,
) => Promise<void>;

export type PDFPageLayoutItem<T> = T & {
	size: BoxSize;
	position: { x: number; y: number };
};
