import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize, prefix } from "@/shared/util";
import type { TCGDividerStickerLayout } from "../model";
import { tcgDividerStickerCategoryId } from "./common";

const asset = prefix("/images/divider/render/tcg-divider-sticker/");

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
	image: asset("70x95.avif"),
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
	image: asset("70x95.avif"),
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
	image: asset("70x107.avif"),
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
	image: asset("70x107.avif"),
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

const gamegenicFlexTab: TCGDividerStickerLayout = {
	...horizontal,
	id: "gamegenic-flex-tab",
	groupId: "gamegenic-flex-tab",
	name: "divider.gamegenic-flex-tab.name",
	description: "divider.gamegenic-flex-tab.description",
	previewName: "divider.gamegenic-flex-tab.preview",
	image: "/images/divider/render/tcg-divider-sticker/gamegenic-flex-tab.avif",
	size: createSize(35, 12),
	printSize: {
		300: {
			size: createSize(413, 142),
			bleedSize: createSize(484, 213),
		},
	},
	params: {
		dividerType: "gamegenic-flex-tab",
	},
};

const gamegenicFlexHorizontal: TCGDividerStickerLayout = {
	...horizontal,
	id: "gamegenic-flex-horizontal",
	groupId: "gamegenic-flex-horizontal",
	name: "divider.gamegenic-flex.name",
	previewName: "divider.gamegenic-flex.name",
	description: "divider.gamegenic-flex.description",
	image: asset("gamegenic-flex.avif"),
	size: createSize(92, 12),
	printSize: {
		300: {
			size: createSize(1087, 142),
			bleedSize: createSize(1157, 213),
		},
	},
};

const gamegenicFlexVertical: TCGDividerStickerLayout = {
	...vertical,
	id: "gamegenic-flex-vertical",
	groupId: "gamegenic-flex-vertical",
	name: "divider.gamegenic-flex.name",
	previewName: "divider.gamegenic-flex.name",
	description: "divider.gamegenic-flex.description",
	image: asset("gamegenic-flex.avif"),
	size: createSize(66, 12),
	printSize: {
		300: {
			size: createSize(780, 142),
			bleedSize: createSize(850, 213),
		},
	},
};

export const tcgDividerStickerLayouts: DividerLayout[] = [
	horizontalSmall,
	verticalSmall,
	horizontalLarge,
	verticalLarge,
	gamegenicFlexTab,
	gamegenicFlexHorizontal,
	gamegenicFlexVertical,
];
