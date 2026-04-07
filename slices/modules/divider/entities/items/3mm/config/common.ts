export const arkhamStarterDividerCategoryId = "3mm";

export const arkhamStarterDividerBaseUrl = "/images/divider/background/3mm";

export const arkhamStarterLayoutObjects = {
	title: {
		fontSize: 3.5,
		height: 3.4,
		top: 0,
		left: 19,
		right: 24,
		default: {
			left: 19,
			right: 24,
			vertical: {
				fontSize: 3.1,
				height: 3.3,
				top: 0,
				left: 29,
				right: 24,
			},
		},
		withPlayerStory: {
			left: 24,
			vertical: {
				left: 29.5,
			},
		},
		xp: {
			right: 33,
		},
		horizontal: {
			top: 3.8,
			right: 0.6,
		},
		vertical: {
			fontSize: 3.1,
			height: 3.3,
			top: 0,
			left: 15,
			right: 24,
			withIcon: {
				left: 20,
			},
		},
	},
	storyTitle: {
		fontSize: 2,
		height: 2.7,
		top: 0.1,
		right: 1.5,
		width: 18,
	},
	cornerIcon: {
		top: 0,
		left: 5.2,
		fontSize: 3.2,
		width: 12.5,
		height: 3.9,
	},
	storyIcon: {
		top: 0,
		left: 19.5,
		fontSize: 3,
		width: 3,
		height: 3,
	},
	xp: {
		top: 0.1,
		right: 24,
		width: 10,
		height: 3,
		fontSize: 5,
		vertical: {
			right: 15,
			withStory: {
				right: 25,
			},
		},
	},
};

/** Shared UI/PDF positions that are not part of the printed background layout objects. */
export const arkhamStarterSharedPositions = {
	/** Matches `ArkhamStarterDivider.styles` side header container box. */
	sideHeaderBox: {
		bottom: 0,
		left: 3.1,
		width: 67,
		height: 3.3,
	},
	/** Horizontal/vertical gap between title left edge and story icon. */
	storyIconGapLeft: 1.5,
} as const;
