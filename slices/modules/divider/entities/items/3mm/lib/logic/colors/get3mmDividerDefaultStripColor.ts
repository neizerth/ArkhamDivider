import { isChallengeStory, isSideContent } from "@/modules/story/shared/lib";
import { storyStripColor as stripColor } from "../../../config";
import type { ArkhamStarterDividerProps } from "../../../model";

const removeInvestigatorPrefix = (code = "") => {
	return code.replace("-investigators", "");
};

export const get3mmDividerDefaultStripColor = (
	divider: ArkhamStarterDividerProps,
) => {
	const { story } = divider;
	if (!story) {
		return stripColor.empty;
	}

	const code = removeInvestigatorPrefix(story.code);
	const return_to_code = removeInvestigatorPrefix(story.return_to_code);

	if (stripColor[code]) {
		return stripColor[code] ?? stripColor.empty;
	}

	if (return_to_code && stripColor[return_to_code]) {
		return stripColor[return_to_code];
	}

	if (isChallengeStory(story)) {
		return stripColor.challenge;
	}

	if (isSideContent(story)) {
		return stripColor.standalone;
	}

	return stripColor.empty;
};
