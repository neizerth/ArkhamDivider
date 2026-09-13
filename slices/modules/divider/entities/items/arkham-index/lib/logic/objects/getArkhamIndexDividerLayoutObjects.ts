import {
	arkhamIndexDividerChapter2Objects,
	arkhamIndexDividerDeckboxObjects,
	arkhamIndexDividerHorizontalObjects,
	arkhamIndexDividerHorizontalSmallObjects,
	arkhamIndexDividerVerticalObjects,
	arkhamIndexDividerVerticalTrimObjects,
} from "../../../config/objects";
import type { ArkhamIndexDividerLayout } from "../../../model";

export const getArkhamIndexDividerLayoutObjects = (
	layout: ArkhamIndexDividerLayout,
) => {
	if (layout.id.includes("chapter2")) {
		return arkhamIndexDividerChapter2Objects;
	}
	if (layout.id.includes("deckbox")) {
		return arkhamIndexDividerDeckboxObjects;
	}
	if (!layout.tabs && layout.orientation === "vertical") {
		return arkhamIndexDividerVerticalTrimObjects;
	}
	if (!layout.tabs) {
		return arkhamIndexDividerHorizontalSmallObjects;
	}
	if (layout.orientation === "horizontal") {
		return arkhamIndexDividerHorizontalObjects;
	}
	return arkhamIndexDividerVerticalObjects;
};
