import { mergeDeepRight } from "ramda";

export const vintageDividerObjects = {
	textColor: "#050505",
	title: {
		default: {
			top: 36.7,
			left: 5,
			right: 5,
			height: 8.2,
			fontSize: 7.8,
		},
		ru: {},
	},
	topTitle: {
		default: {
			top: 10.3,
			left: 5.8,
			right: 5.8,
			fontSize: 4,
			height: 6.6,
		},
		ru: {},
	},
	tab: {
		width: 30,
		height: 17,
	},
	tabShift: {
		offset: 2,
	},
	icon: {
		top: 1.4,
		left: 11.1,
		width: 7.8,
		height: 7.7,
		fontSize: 7.2,
		withXP: {
			fontSize: 6.2,
			height: 6.7,
		},
	},
};

export const vintageDividerHorizontal8Objects = mergeDeepRight(
	vintageDividerObjects,
	{
		icon: {
			left: 1.76,
		},
		tab: {
			width: 11.25,
		},
		tabShift: {
			offset: -5,
		},
	},
);

export const vintageDividerVerticalObjects = mergeDeepRight(
	vintageDividerObjects,
	{
		title: {
			default: {
				top: 44.7,
			},
		},
		tab: {
			width: 22,
		},
		icon: {
			left: 7.1,
		},
	},
);

export const vintageDividerVertical6Objects = mergeDeepRight(
	vintageDividerVerticalObjects,
	{
		icon: {
			left: 1.6,
		},
		tab: {
			width: 11,
		},
		tabShift: {
			offset: -5,
		},
	},
);
