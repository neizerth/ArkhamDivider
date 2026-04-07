import { mergeDeepRight } from "ramda";
import type { SarnetskyIcon, SarnetskyIconRecord } from "../model";

export const sarnetskyCategoryId = "sarnetsky";

const encounterRightIcon: SarnetskyIcon = {
	id: "encounter-right",
	type: "encounter",
	fontSize: 2.8,
	width: 3.2,
	height: 6.1,
	right: 4.2,
	top: 1.9,
	light: true,
};

const leftHorizontalIcon: SarnetskyIcon = {
	id: "left",
	type: "campaign",
	fontSize: 6.4,
	width: 7.1,
	height: 7.1,
	right: 76.4,
	top: 5.4,
	params: {
		scaleType: "circle",
		scaleFactor: {
			circled: 0.9,
		},
	},
};

const rightHorizontalIcon: SarnetskyIcon = {
	id: "right",
	type: "campaign",
	fontSize: 2.4,
	width: 3.2,
	height: 6.1,
	right: 2.7,
	top: 5.9,
};

const centerHorizontalIcon: SarnetskyIcon = {
	id: "center",
	type: "encounter",
	fontSize: 6.4,
	width: 9.8,
	height: 6.1,
	right: 39.3,
	top: 0.8,
};

const horizontalIcons: SarnetskyIconRecord = {
	encounter: [centerHorizontalIcon, encounterRightIcon],
	scenario: [
		{
			...leftHorizontalIcon,
			type: "scenario",
		},
		rightHorizontalIcon,
	],
	campaign: [leftHorizontalIcon, rightHorizontalIcon],
};

const leftVerticalIcon: SarnetskyIcon = {
	...leftHorizontalIcon,
	right: leftHorizontalIcon.right - 25.9,
};

const verticalIcons: SarnetskyIconRecord = {
	encounter: [
		{
			...centerHorizontalIcon,
			right: centerHorizontalIcon.right - 12.7,
		},
		encounterRightIcon,
	],
	scenario: [
		{
			...leftVerticalIcon,
			type: "scenario",
		},
		rightHorizontalIcon,
	],
	campaign: [leftVerticalIcon, rightHorizontalIcon],
};

export const sarnetskyHorizontalDividerObjects = {
	icons: horizontalIcons,
	title: {
		default: {
			// top: 6.5,
			top: 5,
			fontSize: 5,
			height: 8,
			// height: 6.5,
			left: 15,
			right: 9,
		},
		campaign: {},
		scenario: {},
		encounter: {
			top: 8.5,
			left: 4,
			right: 4,
		},
		player: {},
		investigator: {},
		xp: {
			right: 27,
		},
	},
	background: {
		fontSize: 32,
		opacity: 0.07,
	},
	scenarioContent: {
		top: 23,
		left: 5.5,
		right: 5.5,
		bottom: 8.5,

		encounter: {
			top: 21,
		},
		campaign: {
			top: 24,
		},
	},
	subtitle: {
		fontSize: 3,
		top: 17,
		right: 16.5,
		left: 16.5,
		lineHeight: 1.2,
	},
	playerSubtitle: {
		fontSize: 2.5,
		top: 16.8,
		right: 16.5,
		left: 16.5,
		lineHeight: 1.2,
	},
	encounterIcon: {
		fontSize: 3.7,
	},
};

export const sarnetskyVerticalDividerObjects = mergeDeepRight(
	sarnetskyHorizontalDividerObjects,
	{
		icons: verticalIcons,
		subtitle: {
			top: 20.2,
			right: 5,
			left: 5,
		},
		playerSubtitle: {
			top: 20,
		},
		scenarioContent: {
			top: 19,
			encounter: {
				top: 9,
			},
			campaign: {
				top: 19,
			},
		},
		title: {
			default: {
				left: 14,
				right: 8.5,
			},
			encounter: {
				top: 8.5,
				left: 4,
				right: 4,
			},
		},
	},
);
