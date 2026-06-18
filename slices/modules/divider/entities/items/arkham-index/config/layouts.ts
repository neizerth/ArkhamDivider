import { sleeve65x100, tarot } from "@/entities/sleeve/config/sizes";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import type { ArkhamIndexDividerLayout } from "../model";
import { arkhamIndexCategoryId } from "./common";

const horizontal: ArkhamIndexDividerLayout = {
	id: "arkham-index",
	types: ["scenario", "player", "investigator"],
	categoryId: arkhamIndexCategoryId,
	groupId: "horizontal",
	name: "Large",
	orientation: "horizontal",
	color: true,
	size: createSize(87, 83),
	printSize: {
		300: {
			size: createSize(1028, 980),
			bleedSize: createSize(1098, 1051),
		},
	},
	creasingTop: 9.5,
	bleed: 3,
	iconParams: ["icon", "campaignIcon"],
	mediaParams: ["customImage"],
	tabs: {
		type: "fixed",
		value: 3,
	},
	scenarioParams: {
		campaignIcon: true,
		cardsCount: true,
	},
	params: {
		title: true,
	},
	fontFamilySelection: {
		ru: ["Teutonic", "Conkordia"],
	},
};

const medium: ArkhamIndexDividerLayout = {
	...horizontal,
	id: "arkham-index-medium",
	groupId: "medium",
	name: "Medium",
	size: createSize(87, 75.5),
	printSize: {
		300: {
			size: createSize(1028, 892),
			bleedSize: createSize(1098, 963),
		},
	},
	params: {
		title: true,
	},
};

const trim: ArkhamIndexDividerLayout = {
	...horizontal,
	id: "arkham-index-trim",
	groupId: "trim",
	name: "divider.arkham-index.noTab.name",
	previewName: "divider.arkham-index.noTab.name",
	size: createSize(87, 75.5),
	printSize: {
		300: {
			size: createSize(1028, 892),
			bleedSize: createSize(1098, 963),
		},
	},
	params: {
		title: false,
	},
	tabs: null,
};

const deckbox: ArkhamIndexDividerLayout = {
	...horizontal,
	id: "arkham-index-deckbox",
	groupId: "deckbox",
	name: "divider.arkham-index.deckbox.name",
	previewName: "divider.arkham-index.deckbox.name",
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
	params: {
		title: false,
	},
	compatibility: {
		chapter1Box: true,
		deckBox: true,
	},
	tabs: null,
};

const vertical: ArkhamIndexDividerLayout = {
	...horizontal,
	orientation: "vertical",
	id: "arkham-index-vertical",
	groupId: "large",
	size: createSize(65, 108),
	printSize: {
		300: {
			size: createSize(768, 1276),
			bleedSize: createSize(839, 1347),
		},
	},
	params: {
		title: true,
	},
};

const verticalMedium: ArkhamIndexDividerLayout = {
	...vertical,
	id: "arkham-index-vertical-medium",
	groupId: "vertical-medium",
	size: createSize(65, 98),
	name: "Medium",
	printSize: {
		300: {
			size: createSize(768, 1157),
			bleedSize: createSize(839, 1228),
		},
	},
	params: {
		title: true,
	},
};

const verticalTrim: ArkhamIndexDividerLayout = {
	...vertical,
	id: "arkham-index-vertical-trim",
	groupId: "vertical-trim",
	size: createSize(65, 98),
	name: "divider.arkham-index.noTab.name",
	previewName: "divider.arkham-index.noTab.name",
	printSize: {
		300: {
			size: createSize(768, 1157),
			bleedSize: createSize(839, 1228),
		},
	},
	sleeves: [
		{
			id: sleeve65x100.id,
			size: sleeve65x100,
			description: "info.sleeve.customCut.description",
		},
	],
	params: {
		title: false,
	},
	tabs: null,
};

const verticalTrim95: ArkhamIndexDividerLayout = {
	...vertical,
	id: "arkham-index-vertical-trim-95",
	groupId: "vertical-trim-95",
	size: createSize(65, 95),
	name: "divider.arkham-index.noTab95.name",
	previewName: "divider.arkham-index.noTab95.name",
	printSize: {
		300: {
			size: createSize(768, 1122),
			bleedSize: createSize(839, 1193),
		},
	},
	sleeves: [
		{
			id: sleeve65x100.id,
			size: sleeve65x100,
			description: "info.sleeve.customCut.description",
		},
	],
	params: {
		title: false,
	},
	tabs: null,
};

const verticalTrim100: ArkhamIndexDividerLayout = {
	...verticalTrim,
	id: "arkham-index-vertical-trim-100",
	groupId: "vertical-trim-100",
	name: "divider.arkham-index.noTab100.name",
	previewName: "divider.arkham-index.noTab100.name",
	size: createSize(65, 100),
	printSize: {
		300: {
			size: createSize(768, 1181),
			bleedSize: createSize(839, 1252),
		},
	},
	sleeves: [
		{
			id: sleeve65x100.id,
			size: sleeve65x100,
		},
	],
	params: {
		title: false,
	},
	tabs: null,
};

export const arkhamIndexLayouts: DividerLayout[] = [
	horizontal,
	medium,
	trim,
	deckbox,
	vertical,
	verticalMedium,

	verticalTrim95,
	verticalTrim,
	verticalTrim100,
];
