export interface PathAdapter {
	moveTo(x: number, y: number): void;
	lineTo(x: number, y: number): void;
	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
	bezierCurveTo(
		cpx1: number,
		cpy1: number,
		cpx2: number,
		cpy2: number,
		x: number,
		y: number,
	): void;
	arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
	arc(
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
		anticlockwise?: boolean,
	): void;
	rect(x: number, y: number, width: number, height: number): void;
	closePath(): void;
}

export class SVGPath {
	constructor(public readonly adapter: PathAdapter) {}

	static of(adapter: PathAdapter) {
		return new SVGPath(adapter);
	}

	moveTo(x: number, y: number) {
		this.adapter.moveTo(x, y);
		return this;
	}

	lineTo(x: number, y: number) {
		this.adapter.lineTo(x, y);
		return this;
	}

	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
		this.adapter.quadraticCurveTo(cpx, cpy, x, y);
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
		this.adapter.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
		return this;
	}

	arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) {
		this.adapter.arcTo(x1, y1, x2, y2, radius);
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
		this.adapter.arc(x, y, radius, startAngle, endAngle, anticlockwise);
		return this;
	}

	rect(x: number, y: number, width: number, height: number) {
		this.adapter.rect(x, y, width, height);
		return this;
	}

	closePath() {
		this.adapter.closePath();
		return this;
	}

	toString() {
		return this.adapter.toString();
	}
}
