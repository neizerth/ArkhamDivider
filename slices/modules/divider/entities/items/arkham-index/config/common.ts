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
	tab: {
		height: 9.5,
		width: horizontalTabWidths,
		sideWidth: tabSideWidth,
	},
	cornerRadius: 3,
	icon: {
		fontSize: 7,
		top: 0.3,
		width: 10,
		height: 9,
	},
	iconBackground: {
		width: 9.4,
		height: 9.4,
		top: 0,
		left: 0.2,
	},
	scenarioBackground: {
		width: 4.7,
		height: 4.7,
		top: 4.5,
		left: 9.6,
	},
	scenarioNumber: {
		fontSize: 4,
		top: 5.1,
		left: 9.9 + 0.3,
		width: 3.7,
		height: 4.4,
	},
	tabTitle: {
		default: {
			fontSize: 6,
			height: 6,
			top: 2,
			left: 6.5,
			right: 14,
		},
		withIcon: {
			left: 17.5,
			right: 24,
		},
	},
};

export const arkhamIndexDividerVerticalObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{},
);
