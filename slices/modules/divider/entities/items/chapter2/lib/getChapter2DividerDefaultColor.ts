import { chapter2PlayerColors } from "../config";
import type { Chapter2DividerProps } from "../model/chapter2";

export const getChapter2DividerDefaultColor = (
	divider: Chapter2DividerProps,
) => {
	if (divider.layoutType === "scenario") {
		return;
	}
	const factionColor = chapter2PlayerColors[divider.faction];

	if (divider.layoutType === "investigator") {
		return factionColor;
	}

	const { subtype } = divider;
	if (subtype === "weakness") {
		return chapter2PlayerColors.weakness;
	}
	if (subtype === "basic_weakness") {
		return chapter2PlayerColors.basic_weakness;
	}
	return factionColor;
};
