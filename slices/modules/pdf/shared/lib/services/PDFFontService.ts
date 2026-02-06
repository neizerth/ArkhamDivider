import { fonts } from "@/shared/fonts";
import type { DefaultPDFFontFamily, Font, FontFamily } from "@/shared/model";

export class PDFFontService {
	protected registeredFonts: Set<string>;
	protected currentFont: string | null;

	constructor(public readonly doc: PDFKit.PDFDocument) {
		this.currentFont = null;
		this.registeredFonts = new Set();
	}

	get(fontFamily: FontFamily): Font {
		if (PDFFontService.isDefaultFontFamily(fontFamily)) {
			return {
				family: fontFamily,
				src: "default",
				format: "truetype",
			};
		}
		return fonts[fontFamily];
	}

	static isDefaultFontFamily(
		fontFamily: FontFamily,
	): fontFamily is DefaultPDFFontFamily {
		return !(fontFamily in fonts);
	}

	async register(fontFamily: FontFamily) {
		if (PDFFontService.isDefaultFontFamily(fontFamily)) {
			this.registeredFonts.add(fontFamily);
			return;
		}
		const font = fonts[fontFamily];
		const response = await fetch(font.src);
		const arrayBuffer = await response.arrayBuffer();
		this.registeredFonts.add(fontFamily);

		this.doc.registerFont(fontFamily, arrayBuffer);
	}

	async load(fontFamily: FontFamily) {
		if (!this.registeredFonts.has(fontFamily)) {
			await this.register(fontFamily);
			this.currentFont = fontFamily;

			this.doc.font(fontFamily);
			return this.get(fontFamily);
		}

		if (this.currentFont !== fontFamily) {
			this.currentFont = fontFamily;
			this.doc.font(fontFamily);
		}

		return this.get(fontFamily);
	}
}
