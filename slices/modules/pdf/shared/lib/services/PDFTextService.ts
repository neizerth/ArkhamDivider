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
};

export class PDFTextService {
	private overprintService: PDFOverprintService;

	constructor(protected readonly font: PDFFontService) {
		this.overprintService = new PDFOverprintService(font.doc);
	}

	async draw(text: string, options: DrawTextOptions) {
		const { fontFamily, fontSize, x, y, overprint, color, ...textOptions } =
			options;

		if (overprint) {
			this.overprintService.enable();
		}
		const doc = await this.font.load(fontFamily);

		doc.fontSize(fontSize);
		doc.fillColor(color);
		doc.text(text, x, y, textOptions);

		if (overprint) {
			this.overprintService.disable();
		}
	}
}
