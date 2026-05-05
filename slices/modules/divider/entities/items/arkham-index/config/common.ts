import { mergeDeepRight } from "ramda";

export const arkhamIndexCategoryId = "arkham-index";

export const arkhamIndexDividerBaseUrl =
	"/images/divider/background/arkham-index";

export const arkhamIndexDividerExternalUrl = import.meta.env
	.VITE_ARKHAM_INDEX_URL;

const tabSideWidth = 6.5;
const sideOffsetWidth = tabSideWidth * 2;

const horizontalTabWidths: Record<number, number> = {
	1: 25 + sideOffsetWidth,
	2: 46 + sideOffsetWidth,
	3: 68 + sideOffsetWidth,
};

export const arkhamIndexDividerHorizontalObjects = {
	tab: {
		height: 9.5,
		width: horizontalTabWidths,
		sideWidth: tabSideWidth,
		indentSize: 9,
	},
	cornerRadius: 3,
	icon: {
		fontSize: 7.3,
		top: 0.25,
		width: 10.1,
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
		bottomOffset: 5.3,
	},
	campaignIcon: {
		fontSize: 3,
		width: 4,
		height: 4,
	},
	iconBackground: {
		width: 9.4,
		height: 9.4,
		top: 0,
		left: 0.3,
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
		left: 10.1,
		width: 3.7,
		height: 4.4,
		withXP: {
			height: 4,
		},
	},
	backgroundIcon: {
		fontSize: 50,
	},
	tabTitle: {
		default: {
			fontSize: 6,
			height: 6,
			top: 2,
			left: 6.5,
			right: 11,
		},
		withIcon: {
			left: 14.8,
			right: 21,
		},
		withSideText: {
			left: 19.5,
			right: 27,
		},
		fullOffset: {
			default: 7,
			withSideText: 12,
		},
		full: {
			right: 19,
		},
	},
};

export const arkhamIndexDividerHorizontalSmallObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{
		topLine: {
			top: 0.5,
		},
	},
);

const verticalTabWidths: Record<number, number> = {
	1: 15 + sideOffsetWidth,
	2: 28 + sideOffsetWidth,
	3: 46 + sideOffsetWidth,
};

export const arkhamIndexDividerVerticalObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{
		tab: {
			width: verticalTabWidths,
			indentSize: 2,
		},
	},
);

export const arkhamIndexDividerVerticalTrimObjects = mergeDeepRight(
	arkhamIndexDividerVerticalObjects,
	{
		topLine: {
			top: 0.2,
		},
	},
);
