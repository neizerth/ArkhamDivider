import Color from "color";
import { ColorTypes, type RGB } from "pdf-lib";

export const hex = (value: string): RGB => {
	const c = Color(value);

	const [r, g, b] = c.array();

	const red = r / 255;
	const green = g / 255;
	const blue = b / 255;

	return {
		type: ColorTypes.RGB,
		red,
		green,
		blue,
	};
};
