import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import type { TCGDividerStickerLayout } from "../model";
import { tcgDividerStickerCategoryId } from "./common";

const horizontal: DividerLayout = {
	id: "tcg",
	types: ["scenario", "player", "investigator"],
	categoryId: tcgDividerStickerCategoryId,
	groupId: "horizontal",
	name: "divider.tcg-divider-sticker.lowInk",
	orientation: "horizontal",
	color: true,
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

const vertical: TCGDividerStickerLayout = {
	...horizontal,
	id: "tcg-vertical",
	groupId: "vertical",
	name: "divider.tcg-divider-sticker.name",
	description: "divider.tcg-divider-sticker.description",
	orientation: "vertical",
	size: createSize(53, 7),
};

const horizontalSmall: TCGDividerStickerLayout = {
	...horizontal,
	id: "tcg-70x95",
	name: "divider.tcg-divider-sticker.70x95.name",
	description: "divider.tcg-divider-sticker.70x95.description",
	image: "/images/divider/render/tcg-divider-sticker/70x95.avif",
	size: createSize(74, 7),
	printSize: {
		300: {
			size: createSize(874, 83),
			bleedSize: createSize(945, 154),
		},
	},
	params: {
		dividerType: "70x95",
	},
};

const verticalSmall: TCGDividerStickerLayout = {
	...vertical,
	id: "tcg-vertical-70x95",
	name: "divider.tcg-divider-sticker.70x95.name",
	description: "divider.tcg-divider-sticker.70x95.description",
	image: "/images/divider/render/tcg-divider-sticker/70x95.avif",
	orientation: "vertical",
	size: createSize(50, 7),
	printSize: {
		300: {
			size: createSize(591, 83),
			bleedSize: createSize(661, 154),
		},
	},
	params: {
		dividerType: "70x95",
	},
};

const horizontalLarge: TCGDividerStickerLayout = {
	...horizontal,
	id: "tcg-70x107",
	name: "divider.tcg-divider-sticker.70x107.name",
	description: "divider.tcg-divider-sticker.70x107.description",
	image: "/images/divider/render/tcg-divider-sticker/70x107.avif",
	size: createSize(104, 19),
	groupId: "70x107",
	printSize: {
		300: {
			size: createSize(1228, 224),
			bleedSize: createSize(1299, 295),
		},
	},
	params: {
		dividerType: "70x107",
	},
};

const verticalLarge: TCGDividerStickerLayout = {
	...horizontalLarge,
	id: "tcg-vertical-70x107",
	name: "divider.tcg-divider-sticker.70x107.name",
	description: "divider.tcg-divider-sticker.70x107.description",
	image: "/images/divider/render/tcg-divider-sticker/70x107.avif",
	orientation: "vertical",
	size: createSize(66, 7),
	printSize: {
		300: {
			size: createSize(780, 83),
			bleedSize: createSize(850, 154),
		},
	},
	params: {
		dividerType: "70x107",
	},
};

export const tcgDividerStickerLayouts: DividerLayout[] = [
	horizontalSmall,
	verticalSmall,
	horizontalLarge,
	verticalLarge,
];
