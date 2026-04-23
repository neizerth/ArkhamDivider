import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { simpleStickerCategoryId } from "./common";

const ten: DividerLayout = {
	id: "simple-sticker",
	types: ["scenario", "player", "investigator"],
	categoryId: simpleStickerCategoryId,
	groupId: "10mm",
	name: "10mm",
	orientation: "horizontal",
	color: true,
	size: createSize(10, 10),
	printSize: {
		300: {
			size: createSize(118, 118),
			bleedSize: createSize(189, 189),
		},
	},
	bleed: 3,
	iconParams: ["icon"],
};

const sixteen: DividerLayout = {
	...ten,
	id: "simple-sticker-16mm",
	groupId: "16mm",
	name: "16mm",
	size: createSize(16, 16),
	printSize: {
		300: {
			size: createSize(189, 189),
			bleedSize: createSize(260, 260),
		},
	},
};

const twentyFive: DividerLayout = {
	...ten,
	id: "simple-sticker-25mm",
	groupId: "25mm",
	name: "25mm",
	size: createSize(25, 25),
	printSize: {
		300: {
			size: createSize(295, 295),
			bleedSize: createSize(366, 366),
		},
	},
};

const thirtyEight: DividerLayout = {
	...ten,
	id: "simple-sticker-38mm",
	groupId: "38mm",
	name: "38mm",
	size: createSize(38, 38),
	printSize: {
		300: {
			size: createSize(418, 418),
			bleedSize: createSize(489, 489),
		},
	},
};

const fifty: DividerLayout = {
	...ten,
	id: "simple-sticker-50mm",
	groupId: "50mm",
	name: "50mm",
	size: createSize(50, 50),
	printSize: {
		300: {
			size: createSize(591, 591),
			bleedSize: createSize(661, 661),
		},
	},
};

export const simpleStickerLayouts: DividerLayout[] = [
	ten,
	sixteen,
	twentyFive,
	thirtyEight,
	fifty,
];
