import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { DPI } from "@/modules/print/shared/model";
import type { BoxSize } from "@/shared/model";
import type { PDFIconService, PDFTextService } from "../lib";

export type PDFDividerProps = DividerWithRelations;
export type PDFDividerContext = {
	dpi: DPI;
	text: PDFTextService;
	icon: PDFIconService;
	layout: DividerLayout;
	bleedEnabled: boolean;
};

export type PDFDivider<T = void> = (
	props: PDFPageLayoutItem<DividerWithRelations<T>>,
	context: PDFDividerContext,
) => Promise<void>;

export type PDFPageLayoutItem<T> = T & {
	size: BoxSize;
	position: { x: number; y: number };
};
