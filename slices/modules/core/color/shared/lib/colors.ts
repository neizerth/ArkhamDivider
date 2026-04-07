import Color from "color";
import type { RGBAColorObject, RGBColor } from "../model";

/** CMYK components 0–100 (PDFKit divides by 100 for PDF). */
export const cmyk = (
	cyan: number,
	magenta: number,
	yellow: number,
	key: number,
) => {
	return [cyan, magenta, yellow, key] as [number, number, number, number];
};

export const rgb = (red: number, green: number, blue: number) => {
	return [red, green, blue] as [number, number, number];
};

/** HSL hue in [0, 360); achromatic → 0. */
export const rgb2AbsoluteHue = ([r, g, b]: RGBColor): number => {
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

export const rgb2Hue = (color: RGBColor, baseColor: RGBColor) => {
	const hColor = rgb2AbsoluteHue(color);
	const hBase = rgb2AbsoluteHue(baseColor);
	return (hColor - hBase + 360) % 360;
};

export const rgbTuple2Hex = (color: RGBColor) => {
	return `#${color.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};

export const rgb2Tuple = (value: string): RGBColor => {
	const color = Color(value).object();
	return [color.r, color.g, color.b] as RGBColor;
};

export const rgba256 = (color: RGBAColorObject) => {
	const { a = 1 } = color;
	const to256 = (x: number) => x * 255;

	const r = to256(color.r);
	const g = to256(color.g);
	const b = to256(color.b);

	return `rgba(${r}, ${g}, ${b}, ${a})`;
};
