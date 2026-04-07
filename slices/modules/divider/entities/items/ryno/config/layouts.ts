import { sleeve76x88 } from "@/entities/sleeve/config";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { rynoCategoryId } from "./common";

const horizontalLayout: DividerLayout = {
	id: "ryno",
	types: ["scenario", "player", "investigator"],
	categoryId: rynoCategoryId,
	groupId: "horizontal",
	name: "Horizontal",
	orientation: "horizontal",
	color: true,
	size: createSize(89, 76),
	printSize: {
		300: {
			size: createSize(1051, 898),
			bleedSize: createSize(1122, 969),
		},
	},
	bleed: 3,
	sleeves: [
		{
			id: sleeve76x88.id,
			size: sleeve76x88,
		},
	],
	iconParams: ["leftIcon", "rightIcon", "backgroundIcon"],
};

const verticalLayout: DividerLayout = {
	...horizontalLayout,
	id: "ryno-vertical",
	name: "Vertical",
	orientation: "vertical",
	size: createSize(63.7, 101.8),
	printSize: {
		300: {
			size: createSize(752, 1202),
			bleedSize: createSize(823, 1273),
		},
	},
	sleeves: null,
};

const verticalXL: DividerLayout = {
	...verticalLayout,
	id: "ryno-vertical-xl",
	name: "XL",
	groupId: "vertical-xl",
	size: createSize(75.8, 100.8),
	printSize: {
		300: {
			size: createSize(895, 1191),
			bleedSize: createSize(966, 1261),
		},
	},
};

export const rynoLayouts = [horizontalLayout, verticalLayout, verticalXL];
