import type { Story } from "@/modules/story/shared/model";
import { carlosLemosStolyColors } from "../../config/colors";

export const getCarlosLemosDividerColor = (story?: Story) => {
	const storyCode = story?.return_to_code ?? story?.code ?? "default";

	const color =
		carlosLemosStolyColors[storyCode] ?? carlosLemosStolyColors.default;

	return color;
};
