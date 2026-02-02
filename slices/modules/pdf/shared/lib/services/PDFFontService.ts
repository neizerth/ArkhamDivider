import { fonts } from "@/shared/fonts";
import type { FontFamily } from "@/shared/model";

export class PDFFontService {
	protected registeredFonts: Set<string>;
	protected currentFont: string | null;

	constructor(public readonly doc: PDFKit.PDFDocument) {
		this.currentFont = null;
		this.registeredFonts = new Set();
	}

	get(fontFamily: FontFamily) {
		return fonts[fontFamily];
	}

	async register(fontFamily: FontFamily) {
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
