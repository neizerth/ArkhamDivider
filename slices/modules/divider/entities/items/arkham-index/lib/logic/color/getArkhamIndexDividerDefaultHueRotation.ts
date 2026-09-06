import { getColorFilterCssValue } from "@/modules/core/color/shared/lib";
import { isSideContent } from "@/modules/story/shared/lib";
import { arkhamIndexBackgroundFilters as colors } from "../../../config/colors";
import type { ArkhamIndexDividerProps } from "../../../model";

export function getArkhamIndexDividerDefaultFilter(
	divider: ArkhamIndexDividerProps,
) {
	const filter = getFilter(divider);
	if (!filter) {
		return;
	}
	return getColorFilterCssValue(filter);
}

const getFilter = (divider: ArkhamIndexDividerProps) => {
	const color = divider.params?.color;

	if (color) {
		return;
	}

	if (divider.layoutType !== "scenario") {
		return;
	}

	if (isSideContent(divider.story)) {
		const chapter = divider.story.chapter ?? 1;
		const filters =
			chapter === 2 ? colors.standalone.ch2 : colors.standalone.ch1;

		return filters;
	}

	const code = divider.story.return_to_code || divider.story.code;
	const filter = colors.campaign[code];

	if (!filter) {
		return;
	}

	return filter;
};
