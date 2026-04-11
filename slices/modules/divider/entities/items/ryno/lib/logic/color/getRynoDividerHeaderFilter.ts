import Color from "color";
import { isUndefined } from "ramda-adjunct";
import { isAchromatic } from "@/modules/core/color/shared/lib";
import type { RynoDividerProps } from "../../../model";
import { getRynoDividerHeaderColor } from "./getRynoDividerHeaderColor";
import { getRynoDividerHueRotation } from "./getRynoDividerHueRotation";

export const getRynoDividerHeaderFilter = (divider: RynoDividerProps) => {
	const headerColor = getRynoDividerHeaderColor(divider);

	if (isUndefined(headerColor)) {
		return "grayscale(1)";
	}

	if (isAchromatic(headerColor)) {
		const l = Color(headerColor).luminosity();
		const brightness = l * 1 + 2;

		return `grayscale(1) brightness(${brightness})`;
	}

	const hue = getRynoDividerHueRotation(headerColor);

	return `hue-rotate(${hue}deg)`;
};
