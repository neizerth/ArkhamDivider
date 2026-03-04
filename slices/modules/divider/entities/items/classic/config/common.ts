import { percent } from "@/shared/util";

export const classicCategoryId = "classic";

export const classicDividerTextColor = "#2e2622";

export const classicDividerHorizontalObjects = {
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
		cn: {
			fontSize: 4.5,
		},
		ko: {
			top: 3.6,
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
		withXP: {
			top: 1.7,
			right: 0.9,
			fontSize: 7,
		},
		skill: {
			top: 1.2,
			right: 0.9,
			fontSize: 6,
		},
	},
	xp: {
		container: {
			size: 8.33,
			fontSize: 8.33,
			top: 2.3,
			right: 0.5,
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

export const classicDividerHorizontalHQObjects = {
	...classicDividerHorizontalObjects,
	text: {
		...classicDividerHorizontalObjects.text,
		default: {
			...classicDividerHorizontalObjects.text.default,
			top: 3.3,
		},
		ru: {
			...classicDividerHorizontalObjects.text.ru,
			top: 3.5,
		},
		ko: {
			...classicDividerHorizontalObjects.text.ko,
			top: 3.1,
		},
	},
	icon: {
		...classicDividerHorizontalObjects.icon,
		top: 1.5,
		withXP: {
			...classicDividerHorizontalObjects.icon.withXP,
			top: 1.2,
		},
		skill: {
			...classicDividerHorizontalObjects.icon.skill,
			top: 0.7,
		},
	},
	backgroundIcon: {
		...classicDividerHorizontalObjects.backgroundIcon,
		top: 15.6,
	},
};

export const classicDividerVertical63Objects = {
	...classicDividerHorizontalObjects,
	backgroundIcon: {
		...classicDividerHorizontalObjects.backgroundIcon,
		top: 25,
		left: 6.5,
	},
};

export const classicDividerVertical65Objects = {
	...classicDividerVertical63Objects,
	backgroundIcon: {
		...classicDividerVertical63Objects.backgroundIcon,
		left: 7.5,
	},
};

export const classicDividerObjects = {
	horizontal: classicDividerHorizontalObjects,
	vertical63: classicDividerVertical63Objects,
	vertical65: classicDividerVertical65Objects,
};
