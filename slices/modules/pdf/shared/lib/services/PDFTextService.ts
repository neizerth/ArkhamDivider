import type { FontFamily } from "@/shared/model";
import type { PDFFontService } from "./PDFFontService";
import { PDFOverprintService } from "./PDFOverprintService";

export type DrawTextOptions = PDFKit.Mixins.TextOptions & {
	fontFamily: FontFamily;
	fontSize: number;
	x: number;
	y: number;
	overprint?: boolean;
	color: [number, number, number, number];
	opacity?: number;
};

export class PDFTextService {
	public readonly doc: PDFKit.PDFDocument;
	private overprintService: PDFOverprintService;

	constructor(protected readonly font: PDFFontService) {
		this.doc = font.doc;
		this.overprintService = new PDFOverprintService(font.doc);
	}

	async draw(text: string, options: DrawTextOptions) {
		const {
			fontFamily,
			fontSize,
			x,
			overprint,
			color,
			opacity = 1,
			y: yBase,
			...textOptions
		} = options;

		const font = await this.font.load(fontFamily);
		const { descentRatio = 0 } = font;
		const y = yBase - fontSize * descentRatio;
		const { doc } = this.font;

		doc.fontSize(fontSize);
		doc.fillColor(color);
		doc.strokeColor(color);
		doc.opacity(opacity);

		// Apply overprint after fillOpacity so PDFKit's opacity ExtGState doesn't replace it
		if (overprint) {
			this.overprintService.enable();
		}

		doc.text(text, x, y, textOptions);
		if (overprint) {
			this.overprintService.disable();
		}
	}
}
