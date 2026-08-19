import Color from "color";
import type { CMYKColor, RGBAColor, RGBAColorObject, RGBColor } from "../model";
import { isCMYKColor } from "./colorCriteria";

/** CMYK components 0–100 (PDFKit divides by 100 for PDF). */
export const cmyk = (
	cyan: number,
	magenta: number,
	yellow: number,
	key: number,
) => {
	return [cyan, magenta, yellow, key] as CMYKColor;
};

export const rgb = (red: number, green: number, blue: number) => {
	return [red, green, blue] as RGBColor;
};

export const rgba = (
	red: number,
	green: number,
	blue: number,
	alpha: number,
) => {
	return [red, green, blue, alpha] as RGBAColor;
};

/** HSL hue in [0, 360); achromatic → 0. */
export const rgba2AbsoluteHue = ([r, g, b]: [
	number,
	number,
	number,
	number?,
]): number => {
	const rn = r / 255;
	const gn = g / 255;
	const bn = b / 255;
	const max = Math.max(rn, gn, bn);
	const min = Math.min(rn, gn, bn);
	const d = max - min;

	if (d === 0) {
		return 0;
	}

	let h: number;
	if (max === rn) {
		h = ((gn - bn) / d) * 60;
	} else if (max === gn) {
		h = ((bn - rn) / d + 2) * 60;
	} else {
		h = ((rn - gn) / d + 4) * 60;
	}

	return ((h % 360) + 360) % 360;
};

export const rgba2Hue = (
	color: RGBColor | RGBAColor,
	baseColor: RGBColor | RGBAColor,
) => {
	const hColor = rgba2AbsoluteHue(color);
	const hBase = rgba2AbsoluteHue(baseColor);
	return (hColor - hBase + 360) % 360;
};

export const rgbTuple2Hex = (color: RGBColor) => {
	return `#${color.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};

export const rgb2Tuple = (value: string): RGBColor => {
	const color = Color(value).object();
	return [color.r, color.g, color.b] as RGBColor;
};

export const rgba2Tuple = (value: string): RGBAColor => {
	const color = Color(value).object();
	return [color.r, color.g, color.b, color.a] as RGBAColor;
};

export const rgba256 = (color: RGBAColorObject) => {
	const { a = 1 } = color;
	const to256 = (x: number) => x * 255;

	const r = to256(color.r);
	const g = to256(color.g);
	const b = to256(color.b);

	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const isCMYKBlack = (color: unknown) => {
	if (!isCMYKColor(color)) {
		return false;
	}
	const [c, m, y, k] = color;
	return c === 0 && m === 0 && y === 0 && k === 100;
};
