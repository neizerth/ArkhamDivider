import { mergeDeepRight } from "ramda";
import { DEFAULT_CORNER_RADIUS } from "@/modules/print/shared/config";
import { fromMm2Pt } from "@/modules/print/shared/lib";
import type { Constructor } from "@/shared/model";
import {
	LASERCUT_COLOR,
	LASERCUT_GAP,
	LASERCUT_LINE_WIDTH,
} from "../../config";

/** Same as PDFKit `roundedRect` — circle-to-bezier factor for 90° arcs. */
const KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);

type CornerRadius = {
	topLeft: number;
	topRight: number;
	bottomRight: number;
	bottomLeft: number;
};

type AppendRoundedRectPathOptions = {
	x: number;
	y: number;
	width: number;
	height: number;
	radius: CornerRadius;
};

function clampCornerRadius(
	width: number,
	height: number,
	radii: CornerRadius,
): CornerRadius {
	const tl = Math.max(0, radii.topLeft);
	const tr = Math.max(0, radii.topRight);
	const br = Math.max(0, radii.bottomRight);
	const bl = Math.max(0, radii.bottomLeft);
	const factors = [
		tl + tr > 0 ? width / (tl + tr) : Number.POSITIVE_INFINITY,
		tr + br > 0 ? height / (tr + br) : Number.POSITIVE_INFINITY,
		br + bl > 0 ? width / (br + bl) : Number.POSITIVE_INFINITY,
		bl + tl > 0 ? height / (bl + tl) : Number.POSITIVE_INFINITY,
	];
	const scale = Math.min(1, ...factors.filter(Number.isFinite));
	return {
		topLeft: tl * scale,
		topRight: tr * scale,
		bottomRight: br * scale,
		bottomLeft: bl * scale,
	};
}

type Options = {
	cornerRadiusEnabled: boolean;
	enabled: boolean;
	bleedEnabled: boolean;
};

type DrawRectOptions = {
	x: number;
	y: number;
	width: number;
	height: number;
	cornerRadius?: {
		topRight?: number;
		topLeft?: number;
		bottomRight?: number;
		bottomLeft?: number;
	};
};

type DrawCircleOptions = {
	x: number;
	y: number;
	radius: number;
};
type XPosition = "left" | "right";
type YPosition = "top" | "bottom";
export type CornerPosition = `${YPosition}-${XPosition}`;

type DrawCornerOptions = {
	position: CornerPosition;
	x: number;
	y: number;
};

export class PDFLasercutService {
	constructor(
		public readonly doc: PDFKit.PDFDocument,
		protected options: Options,
	) {}

	color = LASERCUT_COLOR;
	lineWidth = LASERCUT_LINE_WIDTH;
	bleedGap = LASERCUT_GAP;
	defaultCornerRadius = DEFAULT_CORNER_RADIUS;

	get gap() {
		const { bleedEnabled } = this.options;
		return bleedEnabled ? this.bleedGap : 0;
	}

	get cornerRadius() {
		const mm = fromMm2Pt();

		const { cornerRadiusEnabled } = this.options;
		return cornerRadiusEnabled ? mm(this.defaultCornerRadius) : 0;
	}

	get defaultCornerRadiusConfig(): CornerRadius {
		return {
			topRight: this.cornerRadius,
			topLeft: this.cornerRadius,
			bottomRight: this.cornerRadius,
			bottomLeft: this.cornerRadius,
		};
	}

	drawRect(options: DrawRectOptions) {
		if (!this.options.enabled) {
			return;
		}
		const cornerRadius = mergeDeepRight(
			this.defaultCornerRadiusConfig,
			options?.cornerRadius ?? {},
		) as CornerRadius;

		const x = options.x - this.gap;
		const y = options.y - this.gap;
		const width = options.width + 2 * this.gap;
		const height = options.height + 2 * this.gap;

		const radius = clampCornerRadius(width, height, cornerRadius);
		this.appendRoundedRectPath({ x, y, width, height, radius });
		this.doc.lineWidth(this.lineWidth).stroke(this.color);
	}

	/** Clockwise from top edge; matches `drawCorner` beziers (PDF y downward). */
	private appendRoundedRectPath(options: AppendRoundedRectPathOptions) {
		const { x, y, width, height, radius } = options;
		const {
			topLeft: tl,
			topRight: tr,
			bottomRight: br,
			bottomLeft: bl,
		} = radius;
		const doc = this.doc;

		doc.moveTo(x + tl, y);
		doc.lineTo(x + width - tr, y);
		if (tr > 0) {
			const c = tr * (1 - KAPPA);
			doc.bezierCurveTo(x + width - c, y, x + width, y + c, x + width, y + tr);
		}
		doc.lineTo(x + width, y + height - br);
		if (br > 0) {
			const c = br * (1 - KAPPA);
			doc.bezierCurveTo(
				x + width,
				y + height - c,
				x + width - c,
				y + height,
				x + width - br,
				y + height,
			);
		}
		doc.lineTo(x + bl, y + height);
		if (bl > 0) {
			const c = bl * (1 - KAPPA);
			doc.bezierCurveTo(
				x + c,
				y + height,
				x,
				y + height - c,
				x,
				y + height - bl,
			);
		}
		doc.lineTo(x, y + tl);
		if (tl > 0) {
			const c = tl * (1 - KAPPA);
			doc.bezierCurveTo(x, y + c, x + c, y, x + tl, y);
		}
		doc.closePath();
	}

	drawCircle(options: DrawCircleOptions) {
		if (!this.options.enabled) {
			return;
		}
		const { x, y } = options;
		const radius = options.radius + this.gap;

		this.doc.circle(x, y, radius).lineWidth(this.lineWidth).stroke(this.color);
	}

	drawCorner(options: DrawCornerOptions) {
		const { cornerRadiusEnabled } = this.options;
		const r = this.cornerRadius;
		const { position, x, y } = options;

		// Clockwise around the shape (PDF: y downward). (x, y) is the outer vertex.
		if (!cornerRadiusEnabled) {
			switch (position) {
				case "top-right": {
					// → along top, then ↓ along right (same endpoints as the r>0 arc)
					return this.doc.lineTo(x, y).lineTo(x, y + r);
				}
				case "top-left": {
					// ↑ along left, then → along top
					return this.doc.lineTo(x, y).lineTo(x + r, y);
				}
				case "bottom-right": {
					// ↓ along right, then ← along bottom
					return this.doc.lineTo(x, y).lineTo(x - r, y);
				}
				case "bottom-left": {
					// ← along bottom, then ↑ along left
					return this.doc.lineTo(x, y).lineTo(x, y - r);
				}
			}
		}

		const c = r * (1 - KAPPA);

		switch (position) {
			case "top-right": {
				return this.doc.bezierCurveTo(x - c, y, x, y + c, x, y + r);
			}
			case "top-left": {
				return this.doc.bezierCurveTo(x, y + c, x + c, y, x + r, y);
			}
			case "bottom-right": {
				return this.doc.bezierCurveTo(x, y - c, x - c, y, x - r, y);
			}
			case "bottom-left": {
				return this.doc.bezierCurveTo(x + c, y, x, y - c, x, y - r);
			}
		}
	}

	from<T extends PDFLasercutService>(Service: Constructor<T>): T {
		return new Service(this.doc, this.options);
	}
}
