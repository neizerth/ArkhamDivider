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

	async measureTextWidth(
		value: string,
		options: Pick<DrawTextOptions, "fontFamily" | "fontSize">,
	) {
		await this.font.load(options.fontFamily);
		this.doc.fontSize(options.fontSize);
		return this.doc.widthOfString(value);
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
		const hasBaseline = Boolean(textOptions.baseline);
		const hasCustomBaseline =
			hasBaseline && textOptions.baseline !== "alphabetic";

		const y = hasCustomBaseline ? yBase : yBase - fontSize * descentRatio;
		const { doc } = this.font;

		doc.fontSize(fontSize);
		doc.fillColor(color);
		doc.strokeColor(color);
		doc.opacity(opacity);

		// Apply overprint after fillOpacity so PDFKit's opacity ExtGState doesn't replace it
		if (overprint) {
			this.overprintService.enable();
		}

		// Prevent PDFKit from wrapping text to a new page (avoids unwanted white pages)
		doc.text(text, x, y, {
			...textOptions,
			lineBreak: false,
		});
		if (overprint) {
			this.overprintService.disable();
		}
	}
}
