import { mergeDeepRight } from "ramda";

export const arkhamIndexCategoryId = "arkham-index";

export const arkhamIndexDividerBaseUrl =
	"/images/divider/background/arkham-index";

const tabSideWidth = 6.5;
const sideOffsetWidth = tabSideWidth * 2;

const horizontalTabWidths: Record<number, number> = {
	1: 27 + sideOffsetWidth,
	2: 48 + sideOffsetWidth,
	3: 81,
};

export const arkhamIndexDividerHorizontalObjects = {
	tab: {
		height: 9.5,
		width: horizontalTabWidths,
		sideWidth: tabSideWidth,
		indentSize: 11,
	},
	cornerRadius: 3,
	icon: {
		fontSize: 7,
		top: 0.3,
		width: 10,
		height: 9,
	},
	title: {
		fontSize: 3.7,
		height: 7.6,
		top: 0.5,
		left: 2,
		right: 2,
	},
	topLine: {
		top: 7.6,
		height: 2.2,
	},
	bottomLine: {
		bottom: 4.6,
		height: 8.3,
	},
	campaignIcon: {
		fontSize: 3,
		width: 4,
		height: 4,
		bottom: 2,
		right: 1.5,
	},
	iconBackground: {
		width: 9.4,
		height: 9.4,
		top: 0,
		left: 0.2,
	},
	sideBackground: {
		width: 4.7,
		height: 4.7,
		top: 4.5,
		left: 9.6,
	},
	sideText: {
		fontSize: 4,
		top: 5.1,
		left: 9.9 + 0.4,
		width: 3.5,
		height: 4.4,
		withXP: {
			height: 4,
		},
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
			left: 14.8,
			right: 24,
		},
		withSideText: {
			left: 20,
			right: 30,
		},
		fullOffset: {
			default: 8,
			withSideText: 13,
		},
	},
};

export const arkhamIndexDividerVerticalObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{},
);
