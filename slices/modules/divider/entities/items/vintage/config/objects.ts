import { mergeDeepRight } from "ramda";

export const vintageDividerObjects = {
	textColor: "#050505",
	title: {
		default: {
			top: 36.7,
			left: 5,
			right: 5,
			height: 8.2,
			fontSize: 8,
		},
		ru: {},
	},
	topTitle: {
		default: {
			top: 10.2,
			left: 5.8,
			right: 5.8,
			fontSize: 4,
			height: 6.6,
		},
		ru: {},
	},
	tab: {
		width: 30,
		height: 10.5,
	},
	icon: {
		top: 1.5,
		left: 11.1,
		width: 7.8,
		height: 7.7,
		fontSize: 7.2,
	},
};

export const vintageDividerVerticalObjects = mergeDeepRight(
	vintageDividerObjects,
	{
		title: {},
		tab: {
			width: 22,
		},
	},
);
