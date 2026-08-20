import Color from "color";

/** Mean HSL lightness of opaque pixels in `*-color.avif` (`Color.lightness()`, 0–100). */
const colorImageLightness = 54.3;

export const getCarlosLemosDividerColorBrightness = (color: string) => {
	return Color(color).lightness() / colorImageLightness;
};
