export type CSSFilter =
	| {
			type: "hue-rotate";
			deg: number;
	  }
	| {
			type: "grayscale";
			value: number;
	  }
	| {
			type: "brightness";
			value: number;
	  };

/** SVG `feColorMatrix` type="matrix": 4×5 row-major (20 values). */
export type ColorMatrix = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
];
