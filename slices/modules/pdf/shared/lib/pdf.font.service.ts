import fontkit from "@pdf-lib/fontkit";
import type { PDFDocument, PDFFont } from "pdf-lib";
import { fonts } from "@/shared/fonts";
import type { FontFamily } from "@/shared/model";

export class PDFFontService {
	protected registeredFonts: Record<string, PDFFont>;

	constructor(protected readonly pdf: PDFDocument) {
		this.registeredFonts = {};

		pdf.registerFontkit(fontkit);
	}

	async register(fontFamily: FontFamily) {
		const font = fonts[fontFamily];
		const response = await fetch(font.src);
		const arrayBuffer = await response.arrayBuffer();
		const entry = await this.pdf.embedFont(arrayBuffer);
		this.registeredFonts[fontFamily] = entry;

		return entry;
	}

	async get(fontFamily: FontFamily) {
		const font = this.registeredFonts[fontFamily];

		if (font) {
			return font;
		}

		return await this.register(fontFamily);
	}
}
