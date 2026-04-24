import { path as d3Path, type Path } from "d3-path";

export class SVGPath {
	readonly #path: Path;
	constructor() {
		this.#path = d3Path();
	}

	static of() {
		return new SVGPath();
	}

	moveTo(x: number, y: number) {
		this.#path.moveTo(x, y);
		return this;
	}

	lineTo(x: number, y: number) {
		this.#path.lineTo(x, y);
		return this;
	}

	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
		this.#path.quadraticCurveTo(cpx, cpy, x, y);
		return this;
	}

	bezierCurveTo(
		cpx1: number,
		cpy1: number,
		cpx2: number,
		cpy2: number,
		x: number,
		y: number,
	) {
		this.#path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
		return this;
	}

	arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) {
		this.#path.arcTo(x1, y1, x2, y2, radius);
		return this;
	}

	arc(
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
		anticlockwise?: boolean,
	) {
		this.#path.arc(x, y, radius, startAngle, endAngle, anticlockwise);
		return this;
	}

	rect(x: number, y: number, width: number, height: number) {
		this.#path.rect(x, y, width, height);
		return this;
	}

	closePath() {
		this.#path.closePath();
		return this;
	}

	toString() {
		return this.#path.toString();
	}
}

export const path = SVGPath.of;
