import { percent } from "@/shared/util";

export const classicCategoryId = "classic";

export const classicDividerTextColor = "#2e2622";

export const classicDividerObjects = {
	text: {
		default: {
			top: 3.8,
			fontSize: 5,
			height: 7.5,
			left: 8.66,
			right: 10.16,
		},
		ru: {
			top: 4,
			fontSize: 4.58,
			height: 7,
		},
	},
	icon: {
		size: 8.33,
		fontSize: 8,
		top: 2,
		right: 0.9,
		params: {
			scaleType: "circle",
			scaleFactor: {
				circled: 0.9,
			},
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
