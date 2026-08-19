import { isCMYKBlack } from "@/modules/core/color/shared/lib";
import type { FontFamily } from "@/shared/model";
import type { PDFColor } from "../../model";
import type { PDFFontService } from "./PDFFontService";
import { PDFOverprintService } from "./PDFOverprintService";

export type DrawTextOptions = PDFKit.Mixins.TextOptions & {
	fontFamily: FontFamily;
	fontSize: number;
	x: number;
	y: number;
	overprint?: boolean;
	color: PDFColor;
	opacity?: number;
};

export class PDFTextService {
	public readonly doc: PDFKit.PDFDocument;
	private overprintService: PDFOverprintService;

	constructor(protected readonly font: PDFFontService) {
		this.doc = font.doc;
		this.overprintService = new PDFOverprintService(font.doc);
	}

	async measureTextWidth({
		text,
		fontFamily,
		fontSize,
	}: {
		text: string;
		fontFamily: FontFamily;
		fontSize: number;
	}) {
		await this.font.load(fontFamily);
		this.doc.fontSize(fontSize);
		return this.doc.widthOfString(text);
	}

	async draw(text: string, options: DrawTextOptions) {
		const {
			fontFamily,
			fontSize,
			x,
			color,
			opacity = 1,
			y: yBase,
			...textOptions
		} = options;

		const canUseOverprint = isCMYKBlack(color);
		const overprint = canUseOverprint && options.overprint;

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

		// Underline/strike read `options.textWidth` in `_fragment`; without `width` that
		// value is never set (only LineWrapper sets it), so `renderedWidth` becomes NaN.
		const textPayload: PDFKit.Mixins.TextOptions & {
			textWidth?: number;
			wordCount?: number;
		} = {
			...textOptions,
			lineBreak: false,
		};

		const hasUnderlineOrStrike = textPayload.underline || textPayload.strike;

		if (!textPayload.width && hasUnderlineOrStrike) {
			textPayload.textWidth = doc.widthOfString(text, {
				features: textPayload.features,
			});
			textPayload.wordCount = 1;
		}

		doc.text(text, x, y, textPayload);
		if (overprint) {
			this.overprintService.disable();
		}
	}
}
