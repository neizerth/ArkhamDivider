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
	tabs: {
		type: "fixed",
		value: 3,
	},
};

const horizontal8Layout: VintageDividerLayout = {
	...horizontalLayout,
	id: "vintage-horizontal-octa",
	name: "Standard 8",
	tabs: {
		type: "fixed",
		value: 8,
	},
};

const horizontalLargeLayout: VintageDividerLayout = {
	...horizontalLayout,
	id: "vintage-large",
	groupId: "horizontal-large",
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

const horizontalLarge8Layout: VintageDividerLayout = {
	...horizontalLargeLayout,
	id: "vintage-large-octa",
	name: "Large 8",
	tabs: {
		type: "fixed",
		value: 8,
	},
};

const verticalLayout: VintageDividerLayout = {
	...horizontalLayout,
	id: "vintage-vertical",
	orientation: "vertical",
	groupId: "vertical",
	size: createSize(66, 99.3),
	printSize: {
		300: {
			size: createSize(780, 1173),
			bleedSize: createSize(850, 1244),
		},
	},
};

const vertical8Layout: VintageDividerLayout = {
	...verticalLayout,
	id: "vintage-vertical-6",
	name: "Standard 6",
	tabs: {
		type: "fixed",
		value: 6,
	},
};

const verticalLargeLayout: VintageDividerLayout = {
	...verticalLayout,
	id: "vintage-vertical-large",
	groupId: "vertical-large",
	name: "Large",
	size: createSize(66, 107.3),
	printSize: {
		300: {
			size: createSize(780, 1267),
			bleedSize: createSize(850, 1338),
		},
	},
};

const verticalLarge8Layout: VintageDividerLayout = {
	...verticalLargeLayout,
	id: "vintage-vertical-large-6",
	name: "Large 6",
	tabs: {
		type: "fixed",
		value: 6,
	},
};

export const vintageLayouts: DividerLayout[] = [
	horizontalLayout,
	horizontal8Layout,
	horizontalLargeLayout,
	horizontalLarge8Layout,
	verticalLayout,
	vertical8Layout,
	verticalLargeLayout,
	verticalLarge8Layout,
];
