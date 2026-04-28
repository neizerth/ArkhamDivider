import {
	arkhamIndexDividerHorizontalObjects,
	arkhamIndexDividerHorizontalSmallObjects,
	arkhamIndexDividerVerticalObjects,
	arkhamIndexDividerVerticalTrimObjects,
} from "../../../config";
import type { ArkhamIndexDividerLayout } from "../../../model";

export const getArkhamIndexDividerLayoutObjects = (
	layout: ArkhamIndexDividerLayout,
) => {
	if (layout.id === "arkham-index-vertical-trim") {
		return arkhamIndexDividerVerticalTrimObjects;
	}
	if (layout.id === "arkham-index-trim") {
		return arkhamIndexDividerHorizontalSmallObjects;
	}
	if (layout.orientation === "horizontal") {
		return arkhamIndexDividerHorizontalObjects;
	}
	return arkhamIndexDividerVerticalObjects;
};
