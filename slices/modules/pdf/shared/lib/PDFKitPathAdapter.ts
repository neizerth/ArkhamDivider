import type { PathAdapter } from "@/entities/common/lib";

const pi = Math.PI;
const epsilon = 1e-6;
const twoPi = 2.0 * pi;

/** PDFKit `VectorMixin` (types often omit it). */
type PDFPathable = PDFKit.PDFDocument & {
	path: (d: string) => PDFKit.PDFDocument;
};

/**
 * One elliptical arc segment as a cubic Bézier (PDFKit `js/path.js` / `segmentToBezier`).
 * Angles are in the ellipse’s local frame before applying `rotationRad` to the axes.
 */
const segmentToBezier = (
	/** Center of the unit circle in local (pre-rotation) coordinates. */
	cx: number,
	cy: number,
	/** Start / end parameter angles (radians) on that local unit circle. */
	th0: number,
	th1: number,
	/** Semi-axes before rotation. */
	rx: number,
	ry: number,
	/** `Math.sin(rotationRad)` — SVG `A` x-axis rotation (radians). */
	rotationSin: number,
	/** `Math.cos(rotationRad)` — SVG `A` x-axis rotation (radians). */
	rotationCos: number,
): [number, number, number, number, number, number] => {
	const a00 = rotationCos * rx;
	const a01 = -rotationSin * ry;
	const a10 = rotationSin * rx;
	const a11 = rotationCos * ry;
	const th_half = 0.5 * (th1 - th0);
	const t =
		((8 / 3) * (Math.sin(th_half * 0.5) * Math.sin(th_half * 0.5))) /
		Math.sin(th_half);
	const x1 = cx + Math.cos(th0) - t * Math.sin(th0);
	const y1 = cy + Math.sin(th0) + t * Math.cos(th0);
	const x3 = cx + Math.cos(th1);
	const y3 = cy + Math.sin(th1);
	const x2 = x3 + t * Math.sin(th1);
	const y2 = y3 - t * Math.cos(th1);
	return [
		a00 * x1 + a01 * y1,
		a10 * x1 + a11 * y1,
		a00 * x2 + a01 * y2,
		a10 * x2 + a11 * y2,
		a00 * x3 + a01 * y3,
		a10 * x3 + a11 * y3,
	];
};

/** Same as PDFKit’s `arcToSegments` (js/pdfkit.js). */
const arcToSegments = (
	x: number,
	y: number,
	rx: number,
	ry: number,
	large: number,
	sweep: number,
	rotateX: number,
	ox: number,
	oy: number,
) => {
	const rotationRad = rotateX * (Math.PI / 180);
	const rotationSin = Math.sin(rotationRad);
	const rotationCos = Math.cos(rotationRad);
	let rx1 = Math.abs(rx);
	let ry1 = Math.abs(ry);
	const px = rotationCos * (ox - x) * 0.5 + rotationSin * (oy - y) * 0.5;
	const py = rotationCos * (oy - y) * 0.5 - rotationSin * (ox - x) * 0.5;
	let pl = (px * px) / (rx1 * rx1) + (py * py) / (ry1 * ry1);
	if (pl > 1) {
		pl = Math.sqrt(pl);
		rx1 *= pl;
		ry1 *= pl;
	}
	const a00 = rotationCos / rx1;
	const a01 = rotationSin / rx1;
	const a10 = -rotationSin / ry1;
	const a11 = rotationCos / ry1;
	const x0 = a00 * ox + a01 * oy;
	const y0 = a10 * ox + a11 * oy;
	const x1 = a00 * x + a01 * y;
	const y1 = a10 * x + a11 * y;
	const d = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
	let sfactor_sq = 1 / d - 0.25;
	if (sfactor_sq < 0) {
		sfactor_sq = 0;
	}
	let sfactor = Math.sqrt(sfactor_sq);
	if (sweep === large) {
		sfactor = -sfactor;
	}
	const xc = 0.5 * (x0 + x1) - sfactor * (y1 - y0);
	const yc = 0.5 * (y0 + y1) + sfactor * (x1 - x0);
	const th0 = Math.atan2(y0 - yc, x0 - xc);
	const th1 = Math.atan2(y1 - yc, x1 - xc);
	let thArc = th1 - th0;
	if (thArc < 0 && sweep === 1) {
		thArc += 2 * Math.PI;
	} else if (thArc > 0 && sweep === 0) {
		thArc -= 2 * Math.PI;
	}
	const segments = Math.ceil(Math.abs(thArc / (Math.PI * 0.5 + 0.001)));
	const result: [
		number,
		number,
		number,
		number,
		number,
		number,
		number,
		number,
	][] = [];
	for (let i = 0; i < segments; i++) {
		const th2 = th0 + (i * thArc) / segments;
		const th3 = th0 + ((i + 1) * thArc) / segments;
		result[i] = [xc, yc, th2, th3, rx1, ry1, rotationSin, rotationCos];
	}
	return result;
};

/** Same as PDFKit’s `solveArc` for the SVG `A` command (js/pdfkit.js). */
const solveArc = (
	doc: PDFKit.PDFDocument,
	x: number,
	y: number,
	coords: [number, number, number, number, number, number, number],
) => {
	const [rx, ry, rot, large, sweep, ex, ey] = coords;
	const segs = arcToSegments(ex, ey, rx, ry, large, sweep, rot, x, y);
	for (const seg of segs) {
		const bez = segmentToBezier(...seg);
		doc.bezierCurveTo(bez[0], bez[1], bez[2], bez[3], bez[4], bez[5]);
	}
};

/**
 * Adapts path commands to PDFKit. `arc` is emitted as `path("M…A…")` (same as `lib/path.js#A` →
 * cubics). `arcTo` is d3-path–style (`lineTo` + SVG `A` as cubics, same as PDFKit’s path parser).
 * @see https://github.com/d3/d3-path/blob/main/src/path.js
 *
 * PDFKit keeps the current point only in the output stream; there is no way to read it from JS.
 * `arcTo` and `closePath` need the last pen and subpath start (d3-path’s x0/y0, x1/y1),
 * so we mirror them here—this is not redundant with the PDF.
 */
export class PDFKitPathAdapter implements PathAdapter {
	private x0: number | null = null;
	private y0: number | null = null;
	private x1: number | null = null;
	private y1: number | null = null;

	constructor(private readonly doc: PDFKit.PDFDocument) {}

	moveTo(x: number, y: number) {
		this.x0 = this.x1 = +x;
		this.y0 = this.y1 = +y;
		this.doc.moveTo(x, y);
	}

	lineTo(x: number, y: number) {
		this.x1 = +x;
		this.y1 = +y;
		this.doc.lineTo(x, y);
	}

	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
		this.x1 = +x;
		this.y1 = +y;
		this.doc.quadraticCurveTo(cpx, cpy, x, y);
	}

	bezierCurveTo(
		cpx1: number,
		cpy1: number,
		cpx2: number,
		cpy2: number,
		x: number,
		y: number,
	) {
		this.x1 = +x;
		this.y1 = +y;
		this.doc.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
	}

	arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) {
		x1 = +x1;
		y1 = +y1;
		x2 = +x2;
		y2 = +y2;
		const r = +radius;
		if (r < 0) {
			throw new Error(`negative radius: ${r}`);
		}
		if (this.x1 === null || this.y1 === null) {
			this.moveTo(x1, y1);
			return;
		}
		const x0 = this.x1;
		const y0 = this.y1;
		const x21 = x2 - x1;
		const y21 = y2 - y1;
		const x01 = x0 - x1;
		const y01 = y0 - y1;
		const l01_2 = x01 * x01 + y01 * y01;

		if (!(l01_2 > epsilon)) {
			return;
		}

		if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
			this.lineTo(x1, y1);
			return;
		}

		const x20 = x2 - x0;
		const y20 = y2 - y0;
		const l21_2 = x21 * x21 + y21 * y21;
		const l20_2 = x20 * x20 + y20 * y20;
		const l21 = Math.sqrt(l21_2);
		const l01 = Math.sqrt(l01_2);
		const t =
			r *
			Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2);
		const t01 = t / l01;
		const t21 = t / l21;

		let arcSx = x0;
		let arcSy = y0;
		if (Math.abs(t01 - 1) > epsilon) {
			arcSx = x1 + t01 * x01;
			arcSy = y1 + t01 * y01;
			this.lineTo(arcSx, arcSy);
		}

		const endX = x1 + t21 * x21;
		const endY = y1 + t21 * y21;
		const sweep = +(y01 * x20 > x01 * y20);
		solveArc(this.doc, arcSx, arcSy, [r, r, 0, 0, sweep, endX, endY]);
		this.x1 = endX;
		this.y1 = endY;
	}

	arc(
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
		anticlockwise?: boolean,
	) {
		// Normalized sweep like `lib/mixins/vector.js#arc` (one full circle = |Δ| = 2π), then
		// SVG `A` via `path()` — the parser calls the same `solveArc` + cubics as `arcTo` here.
		const ac = anticlockwise ?? false;
		let deltaAng = endAngle - startAngle;
		if (Math.abs(deltaAng) > twoPi) {
			deltaAng = twoPi;
		} else if (deltaAng !== 0 && ac !== deltaAng < 0) {
			const dir = ac ? -1 : 1;
			deltaAng = dir * twoPi + deltaAng;
		}

		const r = +radius;
		const a0 = +startAngle;
		const a1 = a0 + deltaAng;
		const sx = x + r * Math.cos(a0);
		const sy = y + r * Math.sin(a0);
		const ex = x + r * Math.cos(a1);
		const ey = y + r * Math.sin(a1);

		if (Math.abs(deltaAng) < epsilon) {
			this.moveTo(sx, sy);
			return;
		}

		const large: 0 | 1 = Math.abs(deltaAng) > pi ? 1 : 0;
		// With y increasing downward in our paths, PDFKit’s A matches sweep + signed Δ like vector.js.
		const sweep: 0 | 1 = deltaAng > 0 ? 1 : 0;

		let d: string;
		// A single A with start = end is degenerate; split into two half-circles.
		if (Math.abs(Math.abs(deltaAng) - twoPi) < 1e-4) {
			const sgn = deltaAng > 0 ? 1 : -1;
			const am = a0 + sgn * pi;
			const mx = x + r * Math.cos(am);
			const my = y + r * Math.sin(am);
			d = `M ${sx} ${sy}A ${r} ${r} 0 0 ${sweep} ${mx} ${my}A ${r} ${r} 0 0 ${sweep} ${ex} ${ey}`;
		} else {
			d = `M ${sx} ${sy}A ${r} ${r} 0 ${large} ${sweep} ${ex} ${ey}`;
		}

		(this.doc as PDFPathable).path(d);
		this.x0 = sx;
		this.y0 = sy;
		this.x1 = ex;
		this.y1 = ey;
	}

	rect(x: number, y: number, width: number, height: number) {
		this.x0 = this.x1 = +x;
		this.y0 = this.y1 = +y;
		this.doc.rect(x, y, width, height);
	}

	closePath() {
		if (this.x1 !== null && this.x0 !== null && this.y0 !== null) {
			this.x1 = this.x0;
			this.y1 = this.y0;
		}
		this.doc.closePath();
	}
}
