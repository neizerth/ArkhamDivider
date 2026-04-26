import type {
	ArkhamIndexDividerProps,
	ArkhamIndexDividerTabSize,
} from "../../model";
import { showArkhamIndexDividerTabTitle } from "./visibility/showArkhamIndexDividerTabTitle";

type Options = {
	divider: ArkhamIndexDividerProps;
	tabSize: ArkhamIndexDividerTabSize;
	showIcon: boolean;
};

export const getArkhamIndexDefaultDividerTitle = (options: Options) => {
	const { divider } = options;
	const showTabTitle = showArkhamIndexDividerTabTitle(options);

	if (divider.layoutType === "player") {
		return;
	}

	if (divider.type === "campaign") {
		return;
	}

	if (showTabTitle) {
		return divider.story.name;
	}

	return divider.title;
};
