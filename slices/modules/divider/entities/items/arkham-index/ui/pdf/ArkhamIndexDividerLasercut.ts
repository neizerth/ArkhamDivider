import { LASERCUT_LINE_WIDTH } from "@/modules/pdf/shared/config";
import { PDFLasercutService } from "@/modules/pdf/shared/lib";
import { fromMm2Pt } from "@/modules/print/shared/lib";
import type { ArkhamIndexDividerBackgroundPathOptions } from "../../lib";
import { getArkhamIndexDividerBackgroundPath } from "../../lib";

type PDFPathable = PDFKit.PDFDocument & {
	path: (d: string) => PDFKit.PDFDocument;
};

export type DrawArkhamIndexLasercutOptions = {
	/** Top-left of the divider in PDF units (pt), matches screen origin (0,0 of the layout). */
	x: number;
	y: number;
	/** Path geometry in the same **mm** space as the on-screen `layout.size` / SVG viewBox. */
	path: ArkhamIndexDividerBackgroundPathOptions;
};

/**
 * Red lasercut stroke along {@link getArkhamIndexDividerBackgroundPath} (tab + rounded body or full-bleed card).
 * We render the SVG `d` string in a scaled millimeter user space (see {@link drawArkhamIndexDividerLasercut}).
 */
export class ArkhamIndexDividerLasercut extends PDFLasercutService {
	drawArkhamIndexDividerLasercut(options: DrawArkhamIndexLasercutOptions) {
		if (!this.options.enabled) {
			return;
		}
		const mm = fromMm2Pt();
		const gap = this.gap / mm(1);
		const d = getArkhamIndexDividerBackgroundPath({
			...options.path,
			x: 0,
			y: 0,
			gap,
		});
		const s = mm(1);
		const doc = this.doc as PDFPathable;
		this.doc.save();
		this.doc.translate(options.x, options.y);
		this.doc.scale(s, s);
		doc.path(d);
		this.doc.lineWidth(LASERCUT_LINE_WIDTH / s).stroke(this.color);
		this.doc.restore();
	}
}
