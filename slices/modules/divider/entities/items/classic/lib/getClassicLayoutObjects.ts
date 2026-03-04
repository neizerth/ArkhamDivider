import type { DividerLayout } from "@/modules/divider/shared/model";
import {
	classicDividerHorizontalHQObjects,
	classicDividerHorizontalObjects,
	classicDividerVertical63Objects,
	classicDividerVertical65Objects,
} from "../config";

export const getClassicLayoutObjects = (layout: DividerLayout) => {
	if (layout.id === "classic-horizontal-hq") {
		return classicDividerHorizontalHQObjects;
	}
	if (layout.size.width === 63) {
		return classicDividerVertical63Objects;
	}
	if (layout.size.width === 65) {
		return classicDividerVertical65Objects;
	}
	return classicDividerHorizontalObjects;
};
