import { mergeDeepRight } from "ramda";

export const rynoCategoryId = "ryno";

export const rynoDividerAssetsBaseUrl = "/images/divider/background/ryno";

export const horizontalRynoLayoutObjects = {
	icons: {
		left: {
			top: 0.8,
			left: 1.3,
			fontSize: 7.8,
			width: 8.9,
			height: 8.9,
		},
		right: {
			top: 0.8,
			right: 0,
			fontSize: 5.1,
			width: 8.9,
			height: 8.9,
		},
		background: {
			top: 25,
			left: 0,
			right: 0,
			fontSize: 43,
			opacity: 0.05,
		},
	},
	subtitle: {
		fontSize: 3,
		left: 11.5,
		right: 11,
		top: 1.5,
		height: 2.8,
	},
	title: {
		fontSize: 5,
		left: 11.5,
		right: 11,
		top: 4.1,
		height: 6,
		noSubtitle: {
			top: 2.2,
		},
		campaign: {
			right: 3,
		},
	},
};

export const verticalRynoLayoutObjects = mergeDeepRight(
	horizontalRynoLayoutObjects,
	{
		icons: {
			left: {
				top: 1.1,
				left: 1.1,
				fontSize: 8,
			},
			right: {
				top: 1.1,
			},
			background: {
				top: 32,
			},
		},
	},
);

export const verticalXLayoutObjects = mergeDeepRight(
	verticalRynoLayoutObjects,
	{
		icons: {
			background: {
				top: 33,
			},
		},
	},
);
