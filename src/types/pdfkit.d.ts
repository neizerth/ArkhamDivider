declare module "pdfkit/js/pdfkit.standalone.js" {
	import PDFDocument from "pdfkit";
	export default PDFDocument;
}

declare module "svg-to-pdfkit" {
	import type PDFKit from "pdfkit";

	type ColorCallbackValue = (number | number[])[];
	type ColorCallbackInput =
		| ColorCallbackValue
		| (colorCallbackValue | number)[];

	export type ColorCallback = (
		colors: ColorCallbackInput,
	) => ColorCallbackInput;
	function SVGtoPDF(
		doc: PDFKit.PDFDocument,
		svg: string | SVGElement,
		x: number,
		y: number,
		options?: {
			width?: number;
			height?: number;
			preserveAspectRatio?: string;
			colorCallback?: ColorCallback;
		},
	): void;
	export default SVGtoPDF;
}
