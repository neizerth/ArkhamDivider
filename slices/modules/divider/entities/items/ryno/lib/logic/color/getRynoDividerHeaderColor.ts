import { rgba2Tuple } from "@/modules/core/color/shared/lib";
import type { RynoDividerProps } from "../../../model";
import { getRynoDividerDefaultHeaderColor } from "./getRynoDividerDefaultHeaderColor";

export const getRynoDividerHeaderColor = (props: RynoDividerProps) => {
	const customColor = props.params?.headerColor;

	if (customColor) {
		return rgba2Tuple(customColor);
	}

	return getRynoDividerDefaultHeaderColor(props);
};
