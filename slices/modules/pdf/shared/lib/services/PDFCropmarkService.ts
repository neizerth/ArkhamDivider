import { MM_TO_PT } from "@/modules/print/shared/config";
import { getGridCropmarks } from "@/modules/print/shared/lib";
import { getCropmarkPosition } from "@/modules/print/shared/lib/logic/cropmark/getCropmarkPosition";
import type { PageLayoutGrid } from "@/modules/print/shared/model";
import { cmyk } from "../color";
import { PDFOverprintService } from "./PDFOverprintService";

const cropmarkColor = cmyk(0, 0, 0, 100);

export type DrawCropmarkOptions = {
	grid: PageLayoutGrid;
	rowIndex: number;
	colIndex: number;
	bleedEnabled?: boolean;
	bleed: number;
	position: { x: number; y: number };
};

export class PDFCropmarkService {
	protected overprintService: PDFOverprintService;
	constructor(public readonly doc: PDFKit.PDFDocument) {
		this.overprintService = new PDFOverprintService(doc);
	}
	draw(options: DrawCropmarkOptions) {
		const { doc } = this;
		const {
			grid,
			rowIndex,
			colIndex,
			bleedEnabled = false,
			bleed,
			position,
		} = options;
		const cropmarks = getGridCropmarks({
			grid,
			rowIndex,
			colIndex,
			bleedEnabled,
		});
		const { unitSize } = grid;

		doc.opacity(1);
		doc.fillColor(cropmarkColor);
		for (const cropmark of cropmarks) {
			const cropmarkPosition = getCropmarkPosition({
				...cropmark.position,
				type: cropmark.type,
				bleed,
				unitSize,
				mmSize: MM_TO_PT,
				bleedEnabled,
			});
			const { width, height } = cropmarkPosition;
			const left = cropmarkPosition.left + position.x;
			const top = position.y + cropmarkPosition.top;
			this.overprintService.enable();
			doc.rect(left, top, width, height).fill();
			this.overprintService.disable();
		}
	}
}
