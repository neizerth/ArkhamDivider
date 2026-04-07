import type { RGBColor } from "@/modules/core/color/shared/model";
import { isChallengeStory, isSideContent } from "@/modules/story/shared/lib";
import {
	rynoCampaignColors,
	rynoFactionColors,
	rynoStandaloneColors,
} from "../../../config";
import type { RynoDividerProps } from "../../../model";

export const getRynoDividerDefaultHeaderColor = (
	props: RynoDividerProps,
): RGBColor | undefined => {
	if (props.layoutType === "scenario") {
		const { story } = props;

		const code = story.return_to_code || story.code;
		const campaignColor = rynoCampaignColors[code];

		if (campaignColor !== undefined) {
			return campaignColor;
		}

		const standaloneColor = rynoStandaloneColors[code];
		if (standaloneColor !== undefined) {
			return standaloneColor;
		}

		if (isChallengeStory(story)) {
			return rynoCampaignColors.challenge;
		}

		if (isSideContent(story)) {
			return;
		}
	}

	if ("faction" in props && props.faction) {
		return rynoFactionColors[props.faction] ?? rynoFactionColors.neutral;
	}
};
