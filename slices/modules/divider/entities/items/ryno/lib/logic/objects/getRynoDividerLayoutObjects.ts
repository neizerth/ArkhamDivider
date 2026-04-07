import type { DividerLayout } from "@/modules/divider/shared/model";
import {
	horizontalRynoLayoutObjects,
	verticalRynoLayoutObjects,
	verticalXLayoutObjects,
} from "../../../config";

export const getRynoDividerLayoutObjects = (layout: DividerLayout) => {
	if (layout.orientation === "horizontal") {
		return horizontalRynoLayoutObjects;
	}

	if (layout.id === "ryno-vertical-xl") {
		return verticalXLayoutObjects;
	}

	return verticalRynoLayoutObjects;
};
