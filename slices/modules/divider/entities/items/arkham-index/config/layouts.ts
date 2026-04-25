import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import type { ArkhamIndexDividerLayout } from "../model";
import { arkhamIndexCategoryId } from "./common";

const horizontal: ArkhamIndexDividerLayout = {
	id: "arkham-index",
	types: ["scenario", "player", "investigator"],
	categoryId: arkhamIndexCategoryId,
	groupId: "horizontal",
	name: "Medium",
	orientation: "horizontal",
	color: true,
	size: createSize(87, 83),
	printSize: {
		300: {
			size: createSize(1028, 1051),
			bleedSize: createSize(1098, 1122),
		},
	},
	bleed: 3,
	iconParams: ["icon", "campaignIcon"],
	tabs: {
		type: "fixed",
		value: 3,
	},
};

const compact: ArkhamIndexDividerLayout = {
	...horizontal,
	id: "arkham-index-compact",
	groupId: "compact",
	name: "Compact",
	size: createSize(87, 73.5),
	printSize: {
		300: {
			size: createSize(1028, 868),
			bleedSize: createSize(1098, 939),
		},
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
};

const verticalCompact: ArkhamIndexDividerLayout = {
	...vertical,
	id: "arkham-index-vertical-compact",
	groupId: "vertical-compact",
	size: createSize(65, 90.5),
	printSize: {
		300: {
			size: createSize(768, 1069),
			bleedSize: createSize(839, 1140),
		},
	},
};

export const arkhamIndexLayouts: DividerLayout[] = [
	horizontal,
	compact,
	vertical,
	verticalCompact,
];
