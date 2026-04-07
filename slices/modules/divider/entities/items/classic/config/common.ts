import { mergeDeepRight } from "ramda";
import { percent } from "@/shared/util";

export const classicCategoryId = "classic";

export const classicDividerTextColor = "#2e2622";

export const classicDividerHorizontalObjects = {
	text: {
		default: {
			top: 2.6,
			fontSize: 5,
			height: 7.5,
			left: 8.66,
			right: 10.16,
		},
		ru: {
			fontSize: 4.58,
			height: 7,
		},
	},
	icon: {
		width: 8.33,
		height: 8.33,
		fontSize: 8,
		top: 2,
		right: 0.6,
		params: {
			scaleType: "circle",
			scaleFactor: {
				circled: 0.9,
			},
		},
		withXP: {
			top: 2.3,
			width: 7.1,
			height: 6.7,
			right: 1.3,
			fontSize: 7,
		},
		skill: {
			top: 3.1,
			width: 7.1,
			height: 4.5,
			right: 1.2,
			fontSize: 6,
		},
	},
	xp: {
		container: {
			size: 8.33,
			fontSize: 8.6,
			top: 1.1,
			right: 0.6,
		},
		side: {
			top: 3.8,
			right: 9.5,
			fontSize: 5,
			height: 7.5,
			paddingInline: 1,
		},
	},
	backgroundIcon: {
		size: 50,
		fontSize: 50,
		top: 16.1,
		left: 19.5,
		opacity: percent(5),
	},
} as const;

export const classicDividerHorizontalHQObjects = mergeDeepRight(
	classicDividerHorizontalObjects,
	{
		text: {
			default: {
				top: 1.9,
			},
			ru: {
				top: 2.1,
			},
			ko: {
				top: 2.7,
			},
		},
		icon: {
			top: 1.3,
			right: 0.8,
			fontSize: 7.9,
			withXP: {
				top: 1.9,
				right: 1.4,
				width: 6.9,
				height: 6.5,
				fontSize: 7,
			},
			skill: {
				top: 0.7,
			},
		},
		backgroundIcon: {
			top: 15.6,
		},
		xp: {
			container: {
				top: 0.3,
				fontSize: 9,
			},
			side: {
				top: 3.2,
			},
		},
	},
);

export const classicDividerVertical63Objects = mergeDeepRight(
	classicDividerHorizontalObjects,
	{
		backgroundIcon: {
			top: 25,
			left: 6.5,
		},
	},
);

export const classicDividerVertical65Objects = mergeDeepRight(
	classicDividerVertical63Objects,
	{
		backgroundIcon: {
			left: 7.5,
		},
		icon: {
			right: 1.6,
			withXP: {
				right: 2.3,
			},
			skill: {
				right: 2.4,
			},
		},
		xp: {
			container: {
				right: 1.8,
			},
			side: {
				right: 11,
			},
		},
	},
);

export const classicDividerObjects = {
	horizontal: classicDividerHorizontalObjects,
	vertical63: classicDividerVertical63Objects,
	vertical65: classicDividerVertical65Objects,
};
