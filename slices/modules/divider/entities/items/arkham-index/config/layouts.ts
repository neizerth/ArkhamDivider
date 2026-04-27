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
	groupId: "vertical",
	size: createSize(65, 100),
	printSize: {
		300: {
			size: createSize(768, 1181),
			bleedSize: createSize(839, 1252),
		},
	},
	params: {
		title: false,
	},
};

const verticalCompact: ArkhamIndexDividerLayout = {
	...vertical,
	id: "arkham-index-vertical-medium",
	groupId: "vertical-medium",
	size: createSize(65, 90.5),
	printSize: {
		300: {
			size: createSize(768, 1069),
			bleedSize: createSize(839, 1140),
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
	verticalCompact,
];
