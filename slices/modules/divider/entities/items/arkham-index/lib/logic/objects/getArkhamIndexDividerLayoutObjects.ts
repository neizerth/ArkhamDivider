import {
	arkhamIndexDividerHorizontalObjects,
	arkhamIndexDividerHorizontalSmallObjects,
	arkhamIndexDividerVerticalObjects,
	arkhamIndexDividerVerticalTrimObjects,
} from "../../../config/objects";
import type { ArkhamIndexDividerLayout } from "../../../model";

export const getArkhamIndexDividerLayoutObjects = (
	layout: ArkhamIndexDividerLayout,
) => {
	if (layout.id === "arkham-index-vertical-trim") {
		return arkhamIndexDividerVerticalTrimObjects;
	}
	if (layout.id.includes("trim")) {
		return arkhamIndexDividerHorizontalSmallObjects;
	}
	if (layout.orientation === "horizontal") {
		return arkhamIndexDividerHorizontalObjects;
	}
	return arkhamIndexDividerVerticalObjects;
};
