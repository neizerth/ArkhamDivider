import {
	vintageDividerObjects,
	vintageDividerVerticalObjects,
} from "../../../config/objects";

export function getVintageDividerObjects(layoutId: string) {
	if (layoutId.includes("vertical")) {
		return vintageDividerVerticalObjects;
	}
	return vintageDividerObjects;
}
