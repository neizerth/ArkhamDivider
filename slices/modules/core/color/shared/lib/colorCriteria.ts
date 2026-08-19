import Color from "color";
import type { CMYKColor, RGBAColor, RGBColor } from "../model";

export const isCMYKColor = (color: unknown): color is CMYKColor => {
	return Array.isArray(color) && color.length === 4;
};

export const isRGBAColor = (color: unknown): color is RGBAColor => {
	return Array.isArray(color) && color.length === 4;
};

export const isRGBColor = (color: unknown): color is RGBColor => {
	return Array.isArray(color) && color.length === 3;
};

export const isAchromatic = (color: RGBAColor | RGBColor) => {
	const [r, g, b] = color;
	const spread = Math.max(r, g, b) - Math.min(r, g, b);
	const c = Color(color);
	return c.saturationl() <= 0.06 || spread <= 14;
};
