import { rgba, rgba2Hue } from "@/modules/core/color/shared/lib";
import type { RGBAColor, RGBColor } from "@/modules/core/color/shared/model";

export const getRynoDividerHueRotation = (color: RGBAColor | RGBColor) => {
	return rgba2Hue(color, rgba(255, 0, 0, 1));
};
