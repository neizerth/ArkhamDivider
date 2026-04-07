import type { DividerLayout } from "@/modules/divider/shared/model";
import {
	sarnetskyHorizontalDividerObjects,
	sarnetskyVerticalDividerObjects,
} from "../../../config";

export const getSarnetskyLayoutObjects = (layout: DividerLayout) => {
	const { orientation } = layout;
	if (orientation === "horizontal") {
		return sarnetskyHorizontalDividerObjects;
	}
	return sarnetskyVerticalDividerObjects;
};
