import type { PageFormat, PageLayoutGrid } from "@/modules/print/shared/model";
import type { BoxSize } from "@/shared/model";

/** Options for drawing PDF page credits (see `PDFCreditsService.draw`). */
export type DrawCreditsOptions = {
	/** Page size in pt (PDF units). */
	pageSize: BoxSize;
	pageFormat: PageFormat;
	layoutGrid: { unitSize: BoxSize };
	singleItemPerPage: boolean;
	cropmarksEnabled: boolean;
	pdfLayout: {
		isLast: boolean;
		grid: PageLayoutGrid;
		itemsCount: number;
	};
	layout: unknown;
	language: string;
};

export type PdfCreditsAuthorBlock = {
	name: string;
	donationUrl: string;
};

export type RenderCreditsParams = {
	pageSize: BoxSize;
	projectUrl: string;
	projectLabel: string;
	author?: PdfCreditsAuthorBlock;
};
