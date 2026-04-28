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
	bleed: 3,
	iconParams: ["icon", "campaignIcon"],
	tabs: {
		type: "fixed",
		value: 3,
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
	name: "No tab",
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
};

const vertical: ArkhamIndexDividerLayout = {
	...horizontal,
	orientation: "vertical",
	id: "arkham-index-vertical",
	groupId: "large",
	size: createSize(65, 107.5),
	printSize: {
		300: {
			size: createSize(768, 1341),
			bleedSize: createSize(839, 1270),
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
	size: createSize(65, 97.5),
	name: "Medium",
	printSize: {
		300: {
			size: createSize(768, 1152),
			bleedSize: createSize(839, 1222),
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
	size: createSize(65, 97.5),
	name: "No tab",
	printSize: {
		300: {
			size: createSize(768, 1152),
			bleedSize: createSize(839, 1222),
		},
	},
	params: {
		title: false,
	},
};

export const arkhamIndexLayouts: DividerLayout[] = [
	horizontal,
	medium,
	trim,
	vertical,
	verticalMedium,
	verticalTrim,
];
