import { getSarnetskyStoryColor } from "../../../sarnetsky/lib";
import { sarnetskyBandPlayerColors } from "../../config/colors";
import type { SarnetskyBandProps } from "../../model";

export const getSarnetskyBandDefaultColor = (props: SarnetskyBandProps) => {
	if (props.layoutType === "scenario") {
		return getSarnetskyStoryColor(props.story);
	}

	return sarnetskyBandPlayerColors[props.faction];
};
