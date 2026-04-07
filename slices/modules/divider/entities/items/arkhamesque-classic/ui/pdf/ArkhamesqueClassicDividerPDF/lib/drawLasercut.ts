import type { PDFDividerContext } from "@/modules/pdf/shared/model";

export type StampLasercutOptions = {
	lasercut: PDFDividerContext["lasercut"];
	unit: PDFDividerContext["unit"];
};

/** Full-bleed rectangle for the lasercut layer. */
export function stampLasercut(options: StampLasercutOptions) {
	const { lasercut, unit } = options;
	const bleed = unit.fromBleed();
	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});
}
