import Color from "color";
import { isUndefined } from "ramda-adjunct";
import { isAchromatic } from "@/modules/core/color/shared/lib";
import type { CSSFilter } from "@/shared/model/style";
import type { RynoDividerProps } from "../../../model";
import { getRynoDividerHeaderColor } from "./getRynoDividerHeaderColor";
import { getRynoDividerHueRotation } from "./getRynoDividerHueRotation";

export const getRynoDividerHeaderFilter = (
	divider: RynoDividerProps,
): CSSFilter[] => {
	const headerColor = getRynoDividerHeaderColor(divider);

	if (isUndefined(headerColor)) {
		return [{ type: "grayscale", value: 1 }];
	}

	if (isAchromatic(headerColor)) {
		const l = Color(headerColor).luminosity();
		const brightness = l * 1 + 2;

		return [
			{ type: "grayscale", value: 100 },
			{ type: "brightness", value: brightness },
		];
	}

	const hue = getRynoDividerHueRotation(headerColor);

	return [{ type: "hue-rotate", deg: hue }];
};
