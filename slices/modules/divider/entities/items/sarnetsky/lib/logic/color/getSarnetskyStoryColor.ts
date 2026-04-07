import type { Story } from "@/modules/story/shared/model";
import { sarnetskyColors } from "../../../config";

export const getSarnetskyStoryColor = (story?: Story) => {
	const storyCode = story?.return_to_code ?? story?.code ?? "default";

	const color = sarnetskyColors[storyCode] ?? sarnetskyColors.default;

	return color;
};
