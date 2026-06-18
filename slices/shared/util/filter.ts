import type { ColorMatrix, CSSFilter } from "../model/style";

const IDENTITY_MATRIX: ColorMatrix = [
	1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
];

const LUMA_R = 0.2126;
const LUMA_G = 0.7152;
const LUMA_B = 0.0722;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const normalizeGrayscaleAmount = (value: number) =>
	clamp01(value > 1 ? value / 100 : value);

const formatMatrixValue = (value: number) => {
	const rounded = Math.round(value * 1_000_000) / 1_000_000;
	return String(rounded);
};

/** Applies `a` then `b` to a color column (equivalent to `b × a`). */
const multiplyColorMatrices = (a: ColorMatrix, b: ColorMatrix): ColorMatrix => {
	const result = new Array<number>(20);

	const at = (matrix: ColorMatrix, row: number, col: number) =>
		matrix[row * 5 + col] ?? 0;

	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 5; col++) {
			let sum = 0;
			for (let k = 0; k < 4; k++) {
				sum += at(b, row, k) * at(a, k, col);
			}
			if (col === 4) {
				sum += at(b, row, 4);
			}
			result[row * 5 + col] = sum;
		}
	}

	return result as ColorMatrix;
};

const hueRotateMatrix = (deg: number): ColorMatrix => {
	const rad = (deg * Math.PI) / 180;
	const cos = Math.cos(rad);
	const sin = Math.sin(rad);

	return [
		// R' = R * [..] + G * [..] + B * [..]
		0.213 + cos * 0.787 - sin * 0.213,
		0.715 - cos * 0.715 - sin * 0.715,
		0.072 - cos * 0.072 + sin * 0.928,
		0,
		0,

		// G' = R * [..] + G * [..] + B * [..]
		0.213 - cos * 0.213 + sin * 0.143,
		0.715 + cos * 0.285 + sin * 0.14,
		0.072 - cos * 0.072 - sin * 0.283,
		0,
		0,

		// B' = R * [..] + G * [..] + B * [..]
		0.213 - cos * 0.213 - sin * 0.787,
		0.715 - cos * 0.715 + sin * 0.715,
		0.072 + cos * 0.928 + sin * 0.072,
		0,
		0,

		// A' сохраняем исходным
		0,
		0,
		0,
		1,
		0,
	];
};

const grayscaleMatrix = (amount: number): ColorMatrix => {
	const s = normalizeGrayscaleAmount(amount);
	const a = 1 - s;

	return [
		LUMA_R + a * (1 - LUMA_R),
		LUMA_G * (1 - a),
		LUMA_B * (1 - a),
		0,
		0,
		LUMA_R * (1 - a),
		LUMA_G + a * (1 - LUMA_G),
		LUMA_B * (1 - a),
		0,
		0,
		LUMA_R * (1 - a),
		LUMA_G * (1 - a),
		LUMA_B + a * (1 - LUMA_B),
		0,
		0,
		0,
		0,
		0,
		1,
		0,
	];
};

/** CSS `brightness(N)`: linear RGB scale; `1` = unchanged. */
const brightnessMatrix = (value: number): ColorMatrix => [
	value,
	0,
	0,
	0,
	0,
	0,
	value,
	0,
	0,
	0,
	0,
	0,
	value,
	0,
	0,
	0,
	0,
	0,
	1,
	0,
];

const cssFilterToColorMatrix = (filter: CSSFilter): ColorMatrix => {
	switch (filter.type) {
		case "hue-rotate":
			return hueRotateMatrix(filter.deg);
		case "grayscale":
			return grayscaleMatrix(filter.value);
		case "brightness":
			return brightnessMatrix(filter.value);
	}
};

const colorMatrixToValues = (matrix: ColorMatrix): string =>
	matrix.map(formatMatrixValue).join(" ");

/** Composes CSS-like filters into one SVG `feColorMatrix` `values` string. */
export const cssFiltersToColorMatrix = (filters: CSSFilter[]): string => {
	if (filters.length === 0) {
		return colorMatrixToValues(IDENTITY_MATRIX);
	}

	const matrix = filters.reduce(
		(accumulated, filter) =>
			multiplyColorMatrices(accumulated, cssFilterToColorMatrix(filter)),
		IDENTITY_MATRIX,
	);

	return colorMatrixToValues(matrix);
};

export const stringifyCSSFilters = (filters: CSSFilter[]): string => {
	if (filters.length === 0) {
		return "none";
	}

	return filters
		.map((filter) => {
			if (filter.type === "grayscale") {
				return `grayscale(${filter.value}%)`;
			}
			if (filter.type === "hue-rotate") {
				return `hue-rotate(${filter.deg}deg)`;
			}
			if (filter.type === "brightness") {
				return `brightness(${filter.value})`;
			}
			return "";
		})
		.join(" ");
};
