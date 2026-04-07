import { isString } from "ramda-adjunct";
import { isFaction } from "@/modules/faction/shared/lib";
import type { RynoDividerProps } from "../../../model";

export const showRynoDividerCornerImage = (props: RynoDividerProps) => {
	if (props.layoutType === "scenario") {
		return true;
	}
	const customIcon = props.params?.leftIcon;
	const isMulticlass = props.faction === "multiclass";

	if (customIcon === props.faction) {
		return isMulticlass;
	}

	if (isString(customIcon)) {
		const isFactionIcon = isFaction(customIcon);
		return !isFactionIcon || customIcon === "multiclass";
	}

	return isMulticlass;
};
