import type { DividerLayout } from "@/modules/divider/shared/model";
import {
	invocation2018DividerHorizontalObjects,
	invocation2018DividerVertical63Objects,
	invocation2018DividerVertical65Objects,
} from "../config";

export const getInvocation2018LayoutObjects = (layout: DividerLayout) => {
	if (layout.size.width === 63) {
		return invocation2018DividerVertical63Objects;
	}
	if (layout.size.width === 65) {
		return invocation2018DividerVertical65Objects;
	}
	return invocation2018DividerHorizontalObjects;
};
