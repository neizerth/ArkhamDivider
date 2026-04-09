import {
	arkhamIndexDividerHorizontalObjects,
	arkhamIndexDividerVerticalObjects,
} from "../../config";
import type { ArkhamIndexDividerLayout } from "../../model";

export const getArkhamIndexDividerLayoutObjects = (
	layout: ArkhamIndexDividerLayout,
) => {
	if (layout.orientation === "horizontal") {
		return arkhamIndexDividerHorizontalObjects;
	}
	return arkhamIndexDividerVerticalObjects;
};
