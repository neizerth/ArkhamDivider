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
			size: createSize(768, 1152),
			bleedSize: createSize(839, 1229),
		},
	},
	params: {
		title: false,
	},
	tabs: null,
};

export const arkhamIndexLayouts: DividerLayout[] = [
	horizontal,
	medium,
	trim,
	vertical,
	verticalMedium,
	verticalTrim,
];
