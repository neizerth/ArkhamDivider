import { mergeDeepRight } from "ramda";

export const tcgDividerStickerCategoryId = "tcg-divider-sticker";

export const tcgDividerSticker70x95Objects = {
	icon: {
		width: 7,
		fontSize: 5,
		top: 0,
		bottom: 0,
		left: 0.2,
	},
	sideIcon: {
		width: 7,
		fontSize: 5,
		top: 0,
		bottom: 0,
		right: 1,
	},
	title: {
		top: 0.6,
		bottom: 0,
		fontSize: 4,
		left: 8,
		right: 1,
	},
	menu: {
		top: 1,
		bottom: 0.5,
		zoom: 0.5,
		right: 3,
	},
	xp: {
		right: 2,
		fontSize: 5,
		width: 10,
	},
	scenario: {
		fontSize: 4,
		right: 2,
		top: 0,
		bottom: 0,
		width: 6,
	},
	withScenario: {
		title: {
			right: 11,
		},
		menu: {
			right: 22,
		},
		clear: {
			right: -6,
		},
	},
	withXP: {
		sideIcon: {
			right: 13,
		},
		title: {
			right: 20,
		},
		menu: {
			right: 40,
		},
		clear: {
			right: 17,
		},
	},
	vertical: {
		withScenario: {},
		withXP: {},
		clear: {
			clear: {
				right: 18,
			},
		},
	},
	clear: {
		top: 0,
		right: 18,
	},
};

export const tcgDividerSticker70x107HorizontalObjects = mergeDeepRight(
	tcgDividerSticker70x95Objects,
	{
		icon: {
			width: 19,
			fontSize: 10,
			left: 1,
		},
		title: {
			left: 20,
			right: 2,
			top: 1,
			fontSize: 7,
		},
		sideIcon: {
			width: 19,
			fontSize: 10,
			top: 0,
			bottom: 0,
			right: 1,
		},
		xp: {
			right: 2,
			fontSize: 10,
			width: 20,
		},
		menu: {
			zoom: 0.8,
		},
		scenario: {
			fontSize: 8,
			right: 2,
			top: 1,
			bottom: 0,
			width: 11,
		},
		withScenario: {
			title: {
				right: 15,
			},
		},
		withXP: {
			sideIcon: {
				right: 20,
			},
			title: {
				right: 36,
			},
			menu: {
				right: 45,
			},
			clear: {
				top: 6,
				right: 51,
			},
		},
		clear: {
			right: 27,
		},
	},
);
