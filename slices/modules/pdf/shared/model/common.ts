import type { PDFPage } from "pdf-lib";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { DPI } from "@/modules/print/shared/model";
import type { PDFIconService } from "../lib";
import type { PDFTextService } from "../lib/pdf.text.service";

export type PDFDividerProps = DividerWithRelations;
export type PDFDividerContext = {
	page: PDFPage;
	dpi: DPI;
	text: PDFTextService;
	icon: PDFIconService;
	position: {
		x: number;
		y: number;
	};
	width: number;
	height: number;
	layout: DividerLayout;
	bleedEnabled: boolean;
};

export type PDFDivider<T = void> = (
	props: DividerWithRelations<T>,
	context: PDFDividerContext,
) => void | Promise<void>;
