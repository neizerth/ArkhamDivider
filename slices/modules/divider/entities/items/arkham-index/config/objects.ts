import { mergeDeepRight } from "ramda";
import type { Faction } from "@/modules/faction/shared/model";

const tabSideWidth = 6.5;
const sideOffsetWidth = tabSideWidth * 2;

const horizontalTabWidths: Record<number, number> = {
	1: 25 + sideOffsetWidth,
	2: 46 + sideOffsetWidth,
	3: 68 + sideOffsetWidth,
};

const fontSizeScale: Record<string, number> = {
	Teutonic: 1,
	Conkordia: 1.3,
};

const factionIconPosition: Record<
	Faction,
	{ top: number; left: number; width: number; height: number }
> = {
	neutral: { top: 1.1, left: 1.3, width: 7.3, height: 7.5 },
	guardian: { top: 1.2, left: 1.3, width: 7.5, height: 7.5 },
	seeker: { top: 1.2, left: 1.3, width: 7.6, height: 7.5 },
	rogue: { top: 0.9, left: 1.2, width: 7.7, height: 7.5 },
	mystic: { top: 1.1, left: 1.3, width: 7.5, height: 7.5 },
	survivor: { top: 1.6, left: 1.3, width: 7.45, height: 7.5 },
	multiclass: { top: 1.1, left: 1.3, width: 7.5, height: 7.5 },
};

export const arkhamIndexDividerHorizontalObjects = {
	factionIconPosition,
	fontSizeScale,
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
		fontSize: 4,
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

export const arkhamIndexDividerDeckboxObjects = mergeDeepRight(
	arkhamIndexDividerHorizontalObjects,
	{
		tabTitle: {
			default: {
				fontSize: 4.5,
				height: 6,
				top: 0.2,
				right: 4.5,
			},
			withIcon: {
				left: 14.8,
			},
			withSideText: {
				left: 19.5,
			},
			fullOffset: {
				default: 4.3,
				withSideText: 4.3,
			},
			full: {
				right: 14,
			},
		},
		iconBackground: {
			width: 6.4,
			height: 6.4,
			top: -0.2,
		},
		icon: {
			fontSize: 5.3,
			top: 0.1,
			width: 7.2,
			height: 6.2,
		},
		sideBackground: {
			top: 0.6,
			left: 88,
		},
		sideText: {
			top: 1.2,
			left: 88.5,
			withXP: {
				fontSize: 3.1,
			},
		},
		factionIconPosition: {
			guardian: { top: 0.5, left: 0.7, width: 5.7, height: 5.7 },
			seeker: { top: 0.45, left: 0.75, width: 5.7, height: 5.7 },
			rogue: { top: 0.4, left: 0.7, width: 5.8, height: 5.8 },
			mystic: { top: 0.5, left: 0.8, width: 5.5, height: 5.5 },
			survivor: { top: 0.6, left: 0.7, width: 5.7, height: 5.7 },
		},
		topLine: {
			top: -2.3,
		},
	},
);

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
