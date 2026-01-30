import type { PDFPage, PDFPageDrawTextOptions } from "pdf-lib";
import type { BoxSize, FontFamily } from "@/shared/model";
import { disableOverprint, enableOverprint } from "./overprint";
import type { PDFFontService } from "./pdf.font.service";

type Align = "left" | "center" | "right";

type DrawOptions = Omit<PDFPageDrawTextOptions, "font" | "x" | "y" | "size"> & {
	fontFamily: FontFamily;
	overprint?: boolean;
	size: number;
	left: number;
	right?: number;
	top: number;
	bottom?: number;
	align?: Align;
};

export class PDFTextService {
	constructor(
		protected font: PDFFontService,
		protected readonly page: PDFPage,
		/** The size of the container in px */
		protected readonly size: BoxSize,
		/** The position of the container in px on the page */
		protected readonly position: { x: number; y: number },
	) {}

	protected getWidth({ left, right = 0 }: { left: number; right?: number }) {
		return this.size.width - left - right;
	}

	protected getHeight({ top, bottom = 0 }: { top: number; bottom?: number }) {
		return this.size.height - top - bottom;
	}

	protected getX({
		left,
		right = 0,
		align = "left",
		textWidth,
	}: {
		left: number;
		right?: number;
		align?: Align;
		textWidth: number;
	}) {
		if (align === "left") {
			return this.position.x + left;
		}
		const width = this.getWidth({ left, right });

		if (align === "center") {
			return this.position.x + left + width / 2 - textWidth / 2;
		}
		// right align
		return this.position.x + left + width - textWidth;
	}

	/**
	 * Draws text on the page relative to its container.
	 * @param text - The text to draw.
	 * @param options - The options for the text.
	 */
	async draw(text: string, options: DrawOptions) {
		const {
			fontFamily,
			overprint,
			left,
			right,
			top,
			align = "left",
			...drawOptions
		} = options;
		const font = await this.font.get(fontFamily);

		const textWidth = font.widthOfTextAtSize(text, drawOptions.size);

		const x = this.getX({
			left,
			right,
			align,
			textWidth,
		});

		const y = this.position.y + this.size.height - options.size - top;

		if (overprint) {
			enableOverprint(this.page);
		}

		this.page.drawText(text, {
			...drawOptions,
			font,
			x,
			y,
		});

		if (overprint) {
			disableOverprint(this.page);
		}
	}
}
