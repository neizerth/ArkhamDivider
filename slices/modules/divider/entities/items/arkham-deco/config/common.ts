import { mergeDeepRight } from "ramda";

export const arkhamDecoCategoryId = "arkham-deco";

export const arkhamDecoAssetUrl = "/images/divider/background/arkham-deco";

export const arkhamDecoHorizontalObjects = {
	header: {
		height: 6,
		left: 0,
		right: 0,
	},
	background: {
		rotated: false,
		fontSize: 22,
	},
	leftIcon: {
		offsetTop: 0,
		fontSize: 4.2,
		width: 10.5,
		height: 6,
	},
	centralIcon: {
		offsetTop: 1.3,
		fontSize: 2.5,
	},
	rightIcon: {
		fontSize: 2.9,
		width: 8,
		height: 6,
	},
	line: {
		default: {
			offsetTop: 1.8,
			crop: {
				left: 10,
				right: 20.8,
			},
			sidePosition: 0,
		},
		noIcon: {
			offsetLeft: 0,
			offsetTop: 1.1,
		},
		tentacles: {
			offsetTop: 1,
		},
	},
	title: {
		default: {
			height: 6,
			fontSize: 4,
			top: 0,
			left: 15,
			right: 9.5,
			textAlign: "left",
		},
		campaign: {
			textAlign: "center",
			right: 15,
		},
		scenario: {
			right: 25,
		},
		xp: {
			right: 25,
		},
		withCentralIcon: {
			height: 6,
			fontSize: 4,
		},
	},

	scenarioCorner: {
		top: 0,
		right: 10.7,
	},
	scenarioNumber: {
		fontSize: 4,
		height: 6,
	},
	xpCost: {
		fontSize: 4,
	},
	sideXp: {
		top: 1.7,
		right: 10,
		fontSize: 4,
		withoutNumericXP: {
			right: 10,
		},
	},
};

export const arkhamDecoVerticalObjects = mergeDeepRight(
	arkhamDecoHorizontalObjects,
	{
		title: {
			default: {
				left: 9,
				right: 7.4,
				fontSize: 4.4,
			},
			xp: {
				right: 7.4,
			},
			campaign: {
				right: 7.4,
			},
			scenario: {
				right: 8,
			},
			withCentralIcon: {
				height: 6,
				fontSize: 4,
			},
		},
		background: {
			rotated: true,
			fontSize: 25,
		},
		line: {
			default: {
				offsetTop: 1.7,
				sidePosition: -18,
				crop: {
					left: 25,
					right: 18.3,
				},
			},
			noIcon: {
				offsetLeft: -15.8,
			},
		},
		sideXp: {
			right: 7.5,
			withoutNumericXP: {
				right: -0.5,
			},
		},
		scenarioCorner: {
			top: 0.2,
			right: 0,
		},
		scenarioNumber: {
			fontSize: 4.4,
			height: 6,
		},
	},
);

export const arkhamDecoChapter2Objects = mergeDeepRight(
	arkhamDecoHorizontalObjects,
	{
		line: {
			noIcon: {
				offsetLeft: -3.3,
			},
		},
	},
);

export const arkhamDecoUCFStandardObjects = mergeDeepRight(
	arkhamDecoHorizontalObjects,
	{
		header: {
			height: 4.9,
			left: 17,
			right: 17,
		},
		title: {
			default: {
				height: 4.4,
				left: 23,
				right: 23,
				fontSize: 4.4,
				top: 0.3,
			},
			campaign: {
				right: 23,
			},
			scenario: {
				right: 24,
			},
			xp: {
				right: 23,
			},
			withCentralIcon: {
				height: 3.8,
			},
		},
		leftIcon: {
			offsetTop: 0.1,
			fontSize: 3.2,
			width: 6,
			height: 4.3,
		},
		centralIcon: {
			offsetTop: 0.9,
			fontSize: 3,
		},
		scenarioCorner: {
			right: 17,
		},
		scenarioNumber: {
			fontSize: 3.5,
			height: 4.3,
		},
		xpCost: {
			fontSize: 3.5,
		},
		sideXp: {
			top: 0.7,
			right: 23,
			withoutNumericXP: {
				right: 17,
			},
		},
	},
);

export const arkhamDecoUCF50Objects = mergeDeepRight(
	arkhamDecoUCFStandardObjects,
	{
		header: {
			left: 21,
			right: 21,
		},
		title: {
			default: {
				left: 27,
				right: 27,
			},
			withCentralIcon: {},
		},
		scenarioCorner: {
			right: 21,
		},
		sideXp: {
			right: 27,
			withoutNumericXP: {
				right: 20.5,
			},
		},
	},
);
