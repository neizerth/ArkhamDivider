import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import type { VintageDividerLayout } from "../model";
import { vintageDividerCategoryId } from "./common";

const horizontalLayout: VintageDividerLayout = {
	id: "vintage",
	types: ["scenario", "player", "investigator"],
	categoryId: vintageDividerCategoryId,
	groupId: "horizontal",
	name: "Standard",
	orientation: "horizontal",
	color: true,
	size: createSize(90, 72),
	printSize: {
		300: {
			size: createSize(1063, 850),
			bleedSize: createSize(1134, 921),
		},
	},
	bleed: 3,
	params: {
		tabWidth: 30,
	},
};

const horizontalLargeLayout: VintageDividerLayout = {
	...horizontalLayout,
	id: "vintage-large",
	groupId: "large",
	name: "Large",
	orientation: "horizontal",
	size: createSize(90, 77),
	printSize: {
		300: {
			size: createSize(1063, 909),
			bleedSize: createSize(1134, 980),
		},
	},
};

const verticalLayout: VintageDividerLayout = {
	...horizontalLayout,
	id: "vertical",
	orientation: "vertical",
	size: createSize(66, 107.3),
	printSize: {
		300: {
			size: createSize(780, 1267),
			bleedSize: createSize(850, 1338),
		},
	},
	params: {
		tabWidth: 22,
	},
};

export const vintageLayouts: DividerLayout[] = [
	horizontalLayout,
	horizontalLargeLayout,
	verticalLayout,
];
