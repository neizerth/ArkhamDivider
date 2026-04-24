import { mergeDeepRight } from "ramda";

export const arkhamIndexCategoryId = "arkham-index";

export const arkhamIndexDividerBaseUrl =
	"/images/divider/background/arkham-index";

const tabSideWidth = 6.5;
const sideOffsetWidth = tabSideWidth * 2;

const horizontalTabWidths: Record<number, number> = {
	1: 27 + sideOffsetWidth,
	2: 54 + sideOffsetWidth,
	3: 81,
};

export const arkhamIndexDividerHorizontalObjects = {
	tab: { height: 9.5, width: horizontalTabWidths, sideWidth: tabSideWidth },
	cornerRadius: 3,
};

export const arkhamIndexDividerVerticalObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{},
);
