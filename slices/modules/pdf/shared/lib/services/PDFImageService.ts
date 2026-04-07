import { Buffer } from "buffer";
import { cmyk } from "@/modules/core/color/shared/lib";
import { PDFOverprintService } from "./PDFOverprintService";

export type DrawImageOptions = {
	x: number;
	y: number;
	width: number;
	height: number;
	opacity?: number;
};

export type DrawSVGOptions = DrawImageOptions & {
	overprint?: boolean;
	color?: [number, number, number, number];
};

export class PDFImageService {
	protected overprint: PDFOverprintService;
	constructor(public readonly doc: PDFKit.PDFDocument) {
		this.overprint = new PDFOverprintService(doc);
	}

	async drawSVG(svgString: string, options: DrawSVGOptions) {
		const { default: SVGtoPDF } = await import("svg-to-pdfkit");
		const black = cmyk(0, 0, 0, 100);
		const {
			width,
			height,
			opacity = 1,
			overprint: overprintEnabled,
			color = black,
		} = options;
		const { x, y } = options;

		if (overprintEnabled) {
			this.overprint.enable();
		}

		SVGtoPDF(this.doc, svgString, x, y, {
			width,
			height,
			preserveAspectRatio: "xMidYMid meet",
			colorCallback(srcColors) {
				const count = srcColors.length;
				const baseColor = [color, opacity];

				if (count === 2) {
					return baseColor;
				}

				const colors = srcColors.slice(0, count - 1).fill(baseColor);

				return [...colors, opacity];
			},
		});

		if (overprintEnabled) {
			this.overprint.disable();
		}
	}

	drawImage(arrayBuffer: ArrayBuffer, options: DrawImageOptions) {
		const { x, y, width, height, opacity = 1 } = options;

		this.doc.opacity(opacity);
		this.doc.image(Buffer.from(arrayBuffer), x, y, {
			width,
			height,
		});
		this.doc.opacity(1);
	}
}
