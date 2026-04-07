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

export class ArkhamDecoDividerLasercut extends PDFLasercutService {
	drawTab(options: DrawTabOptions) {
		const { tab } = options;

		const x = options.x - this.gap;
		const y = options.y - this.gap;
		const width = options.width + 2 * this.gap;
		const height = options.height + 2 * this.gap;

		this.doc
			.moveTo(x + this.cornerRadius, y + tab.height)
			// left tab cut _
			.lineTo(x + tab.offsetInline, y + tab.height)
			// tab left border _|
			.lineTo(x + tab.offsetInline, y)
			// tab top border _Г
			.lineTo(x + tab.offsetInline + tab.width, y)
			// right tab border
			.lineTo(x + tab.offsetInline + tab.width, y + tab.height)
			// right tab bottom border
			.lineTo(x + width - this.cornerRadius, y + tab.height);

		// (x, y) for each drawCorner is the sharp outer vertex; path must already sit on the arc start.
		this.drawCorner({
			position: "top-right",
			x: x + width,
			y: y + tab.height,
		}).lineTo(x + width, y + height - this.cornerRadius);

		this.drawCorner({
			position: "bottom-right",
			x: x + width,
			y: y + height,
		}).lineTo(x + this.cornerRadius, y + height);

		this.drawCorner({
			position: "bottom-left",
			x: x,
			y: y + height,
		}).lineTo(x, y + tab.height + this.cornerRadius);

		this.drawCorner({
			position: "top-left",
			x: x,
			y: y + tab.height,
		}).closePath();

		this.doc.lineWidth(this.lineWidth).stroke(this.color);
	}
}
