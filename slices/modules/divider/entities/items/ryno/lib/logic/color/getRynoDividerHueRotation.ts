import { isUndefined } from "ramda-adjunct";
import { rgb, rgb2Hue, rgb2Tuple } from "@/modules/core/color/shared/lib";
import type { RynoDividerProps } from "../../../model";
import { getRynoDividerDefaultHeaderColor } from "./getRynoDividerDefaultHeaderColor";

export const getRynoDividerHueRotation = (props: RynoDividerProps) => {
	const customColor = props.params?.headerColor;

	const color = customColor
		? rgb2Tuple(customColor)
		: getRynoDividerDefaultHeaderColor(props);

	if (isUndefined(color)) {
		return;
	}

	return rgb2Hue(color, rgb(255, 0, 0));
};
