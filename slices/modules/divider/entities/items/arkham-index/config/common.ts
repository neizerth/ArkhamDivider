import { mergeDeepRight } from "ramda";

export const arkhamIndexCategoryId = "arkham-index";

export const arkhamIndexDividerBaseUrl =
	"/images/divider/background/arkham-index";

export const arkhamIndexDividerHorizontalObjects = {
	tab: {
		height: 9.5,
		width: {
			1: 42.4,
			2: 63.6,
			3: 84.8,
		},
		sideWidth: 6.35,
	},
};

export const arkhamIndexDividerVerticalObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{},
);
