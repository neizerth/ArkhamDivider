import type { DividerType } from "@/modules/divider/shared/model";
import type { RynoDividerLayoutObjects } from "../../../model";

type Options = {
	objects: RynoDividerLayoutObjects;
	showSubtitle: boolean;
	type: DividerType;
};

export const getRynoDividerTitleObject = (options: Options) => {
	const { objects: O, showSubtitle, type } = options;

	const base = {
		...O.title,
		...(type === "campaign" ? O.title.campaign : {}),
	};

	if (showSubtitle) {
		return base;
	}

	return {
		...base,
		...O.title.noSubtitle,
	};
};
