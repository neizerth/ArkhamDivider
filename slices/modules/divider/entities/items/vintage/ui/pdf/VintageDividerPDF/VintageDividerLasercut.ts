import { PDFLasercutService } from "@/modules/pdf/shared/lib";

type DrawTabOptions = {
	x: number;
	y: number;
	width: number;
	height: number;
	tab: {
		offsetInline: number;
		width: number;
		height: number;
	};
};

export class VintageDividerLasercut extends PDFLasercutService {
	drawTab(options: DrawTabOptions) {
		const { tab } = options;

		const x = options.x - this.gap;
		const y = options.y - this.gap;
		const width = options.width + 2 * this.gap;
		const height = options.height + 2 * this.gap;

		const r = this.cornerRadius;

		// Start on the left edge at the tab baseline.
		this.doc
			.moveTo(x, y + tab.height)
			// Move to the tab start on the baseline.
			.lineTo(x + tab.offsetInline, y + tab.height)
			// Up to the top-left tab corner arc start.
			.lineTo(x + tab.offsetInline, y + r);

		// Round top-left tab corner.
		this.drawCorner({
			position: "top-left",
			x: x + tab.offsetInline,
			y,
		})
			// Across the tab top to the top-right arc start.
			.lineTo(x + tab.offsetInline + tab.width - r, y);

		// Round top-right tab corner.
		this.drawCorner({
			position: "top-right",
			x: x + tab.offsetInline + tab.width,
			y,
		})
			// Down to the baseline.
			.lineTo(x + tab.offsetInline + tab.width, y + tab.height)
			// Continue baseline to the right edge.
			.lineTo(x + width, y + tab.height)
			// Down the right edge to bottom-right arc start.
			.lineTo(x + width, y + height - r);

		// Round bottom-right divider corner.
		this.drawCorner({
			position: "bottom-right",
			x: x + width,
			y: y + height,
		})
			// Along bottom to bottom-left arc start.
			.lineTo(x + r, y + height);

		// Round bottom-left divider corner.
		this.drawCorner({
			position: "bottom-left",
			x,
			y: y + height,
		})
			// Up left edge back to baseline.
			.lineTo(x, y + tab.height)
			.closePath();

		this.doc.lineWidth(this.lineWidth).stroke(this.color);
	}
}
