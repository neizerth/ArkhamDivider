import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { tcgDividerStickerCategoryId } from "./common";

const horizontal: DividerLayout = {
	id: "tcg",
	types: ["scenario", "player", "investigator"],
	categoryId: tcgDividerStickerCategoryId,
	groupId: "horizontal",
	name: "divider.tcg-divider-sticker.lowInk",
	orientation: "horizontal",
	color: false,
	size: createSize(77, 7),
	printSize: {
		300: {
			size: createSize(850, 83),
			bleedSize: createSize(921, 154),
		},
	},
	bleed: 3,
	iconParams: ["icon", "sideIcon"],
};

const vertical: DividerLayout = {
	...horizontal,
	id: "tcg-vertical",
	groupId: "vertical",
	name: "divider.tcg-divider-sticker.name",
	description: "divider.tcg-divider-sticker.description",
	orientation: "vertical",
	size: createSize(53, 7),
};

const horizontalSmall: DividerLayout = {
	...horizontal,
	id: "tcg-small",
	name: "divider.tcg-divider-sticker.name",
	description: "divider.tcg-divider-sticker.description",
	size: createSize(74, 7),
	printSize: {
		300: {
			size: createSize(874, 83),
			bleedSize: createSize(945, 154),
		},
	},
};

const verticalSmall: DividerLayout = {
	...vertical,
	id: "tcg-vertical-small",
	name: "divider.tcg-divider-sticker.name",
	description: "divider.tcg-divider-sticker.description",
	orientation: "vertical",
	size: createSize(50, 7),
	printSize: {
		300: {
			size: createSize(591, 83),
			bleedSize: createSize(661, 154),
		},
	},
};

const horizontalLarge: DividerLayout = {
	...horizontal,
	id: "tcg-large",
	name: "divider.tcg-divider-sticker.large.name",
	description: "divider.tcg-divider-sticker.large.description",
	size: createSize(104, 19),
	groupId: "large",
	printSize: {
		300: {
			size: createSize(1228, 224),
			bleedSize: createSize(1299, 295),
		},
	},
};

const verticalLarge: DividerLayout = {
	...horizontal,
	id: "tcg-vertical-large",
	name: "divider.tcg-divider-sticker.large.name",
	description: "divider.tcg-divider-sticker.large.description",
	orientation: "vertical",
	size: createSize(67, 19),
	printSize: {
		300: {
			size: createSize(791, 224),
			bleedSize: createSize(862, 295),
		},
	},
};

export const tcgDividerStickerLayouts: DividerLayout[] = [
	horizontalSmall,
	verticalSmall,
	horizontalLarge,
	verticalLarge,
];
