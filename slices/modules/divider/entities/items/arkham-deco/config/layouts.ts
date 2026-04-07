import {
	outerSleeve,
	quadroLarge,
	smallCCG,
	tarot,
} from "@/entities/sleeve/config";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import type { ArkhamDecoDividerLayout } from "../model";
import { arkhamDecoCategoryId } from "./common";

const chapter1Layout: ArkhamDecoDividerLayout = {
	id: "arkham-deco",
	name: "divider.arkhamDeco.chapter1",
	image: "/images/divider/render/arkham-deco.avif",
	orientation: "horizontal",
	description: "divider.layout.arkham-deco.chapter1.description",
	color: true,
	size: createSize(94, 68.5),
	printSize: {
		300: {
			size: createSize(1110, 809),
			bleedSize: createSize(1181, 880),
		},
	},
	bleed: 3,
	sleeves: [
		{
			id: outerSleeve.id,
			size: outerSleeve,
			description: "layout.sleeve.outerSleeve.description",
		},
	],
	types: ["scenario", "player", "investigator"],
	categoryId: arkhamDecoCategoryId,
	groupId: "chapter1",
	scenarioParams: {
		campaignIcon: true,
		cardCount: true,
	},
	playerParams: {
		numericXP: true,
		sideXP: true,
		story: true,
	},
	additionalParams: {
		singleSide: true,
	},
	iconParams: ["smallIcon", "backgroundIcon", "secondaryIcon"],
	compatibility: {
		chapter1Box: true,
	},
};

const chapter2Layout: ArkhamDecoDividerLayout = {
	...chapter1Layout,
	id: "chapter2",
	groupId: "chapter2",
	name: "divider.arkhamDeco.chapter2",
	description: "divider.layout.arkham-deco.chapter2.description",
	size: createSize(87, 70),
	printSize: {
		300: {
			size: createSize(1028, 827),
			bleedSize: createSize(1098, 898),
		},
	},
	sleeves: [
		{
			id: quadroLarge.id,
			size: quadroLarge,
			description: "info.sleeve.customCut.description",
		},
	],
	compatibility: {
		chapter1Box: true,
		chapter2Box: true,
	},
};

const deckBoxLayout: ArkhamDecoDividerLayout = {
	...chapter1Layout,
	id: "arkham-deco-deck-box",
	groupId: "deck-box",
	name: "divider.arkhamDeco.deckBox",
	description: "divider.layout.arkham-deco.deckBox.description",
	size: createSize(94, 70),
	printSize: {
		300: {
			size: createSize(1110, 827),
			bleedSize: createSize(1181, 898),
		},
	},
	sleeves: [
		{
			id: tarot.id,
			size: tarot,
			description: "info.sleeve.customCut.description",
		},
	],
	compatibility: {
		chapter1Box: true,
		deckBox: true,
	},
};

const ucfStandardLayout: ArkhamDecoDividerLayout = {
	...chapter1Layout,
	id: "ucf-standard",
	groupId: "ucf-standard",
	name: "divider.arkhamDeco.ucfStandard",
	previewName: "Meeple House UCF Standard",
	description: "divider.layout.arkham-deco.ucfStandard.description",
	size: createSize(94, 67),
	printSize: {
		300: {
			size: createSize(1110, 791),
			bleedSize: createSize(1181, 862),
		},
	},
	sleeves: null,
	params: {
		tab: true,
	},
};

export const ucf50Layout: ArkhamDecoDividerLayout = {
	...chapter1Layout,
	id: "ucf-50",
	groupId: "ucf-50",
	name: "divider.arkhamDeco.ucf50",
	previewName: "Meeple House UCF 50",
	description: "divider.layout.arkham-deco.ucf50.description",
	size: createSize(93.5, 68.5),
	printSize: {
		300: {
			size: createSize(1104, 809),
			bleedSize: createSize(1175, 880),
		},
	},
	sleeves: null,
	params: {
		tab: true,
	},
};

const verticalLayout: ArkhamDecoDividerLayout = {
	...chapter1Layout,
	id: "arkham-deco-vertical",
	groupId: "vertical",
	name: "Vertical",
	description: "divider.layout.arkham-deco.vertical.description",
	size: createSize(62, 96),
	orientation: "vertical",
	printSize: {
		300: {
			size: createSize(732, 1134),
			bleedSize: createSize(803, 1205),
		},
	},
	sleeves: [
		{
			id: smallCCG.id,
			size: smallCCG,
			description: "info.sleeve.customCut.description",
		},
	],
	compatibility: null,
};

const coloredLayouts: DividerLayout[] = [
	chapter1Layout,
	chapter2Layout,
	deckBoxLayout,
	ucfStandardLayout,
	ucf50Layout,
	verticalLayout,
];

const grayscaleLayouts: DividerLayout[] = coloredLayouts.map((layout) => ({
	...layout,
	id: `${layout.id}-bw`,
	color: false,
}));

export const arkhamDecoLayouts: DividerLayout[] = [
	...coloredLayouts,
	...grayscaleLayouts,
];
