import { isStandaloneStory } from "@/modules/story/shared/lib";
import {
	vintageDefaultColor,
	vintagePlayerColors,
	vintageStoryColors,
} from "../../config/colors";
import type { VintageDividerProps } from "../../model";

export const getVintageDividerDefaultTabColor = (
	props: VintageDividerProps,
) => {
	if (props.layoutType === "scenario") {
		if (isStandaloneStory(props.story)) {
			return vintageStoryColors.standalone;
		}
		const code = props.story.return_to_code || props.story.code;
		return vintageStoryColors[code] || vintageDefaultColor;
	}
	return vintagePlayerColors[props.faction] ?? vintageDefaultColor;
};
