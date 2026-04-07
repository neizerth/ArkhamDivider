import { CREASE_COLOR, CREASE_LINE_WIDTH } from "../../config";

export type DrawCreaseLineOptions = {
	x: number;
	y: number;
	offset?: number;
	width: number;
};

type Options = {
	enabled: boolean;
};

export class PDFCreaseService {
	constructor(
		public readonly doc: PDFKit.PDFDocument,
		protected options: Options,
	) {}

	color = CREASE_COLOR;
	lineWidth = CREASE_LINE_WIDTH;

	/**
	 * Draw a single horizontal crease line starting at (x, y) with `width`.
	 */
	draw({ x, y, offset, width }: DrawCreaseLineOptions) {
		if (!this.options.enabled || !offset) {
			return;
		}
		const lineY = y + offset - this.lineWidth / 2;
		this.doc
			.moveTo(x, lineY)
			.lineTo(x + width, lineY)
			.lineWidth(this.lineWidth)
			.stroke(this.color);
	}
}
