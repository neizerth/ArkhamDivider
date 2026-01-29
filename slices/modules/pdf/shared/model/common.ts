import type { Style } from "@react-pdf/stylesheet";

type PDFUnitCallback = (number: number) => string;
export type LocalePDFStyleCallback = (
	mm: PDFUnitCallback,
) => Record<string, Style>;

export type PDFStyleCallback = (mm: PDFUnitCallback) => Style;
