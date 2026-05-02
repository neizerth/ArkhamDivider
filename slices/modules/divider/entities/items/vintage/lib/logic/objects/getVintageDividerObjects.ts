import {
	vintageDividerHorizontal8Objects,
	vintageDividerObjects,
	vintageDividerVertical6Objects,
	vintageDividerVerticalObjects,
} from "../../../config/objects";

export function getVintageDividerObjects(layoutId: string) {
	if (layoutId.includes("vertical")) {
		if (layoutId.includes("-6")) {
			return vintageDividerVertical6Objects;
		}
		return vintageDividerVerticalObjects;
	}
	if (layoutId.includes("octa")) {
		return vintageDividerHorizontal8Objects;
	}
	return vintageDividerObjects;
}
