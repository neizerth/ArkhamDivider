import {
	vintageDividerObjects,
	vintageDividerVerticalObjects,
} from "../../../config/objects";

export function getVintageDividerObjects(layoutId: string) {
	if (layoutId === "vintage-vertical") {
		return vintageDividerVerticalObjects;
	}
	return vintageDividerObjects;
}
