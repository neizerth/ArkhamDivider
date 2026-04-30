import type { DividerLayout } from "@/modules/divider/shared/model";

import { createSize } from "@/shared/util";
import { binderBookmarkCategoryId } from "./common";

const layout: DividerLayout = {
	id: "binder-bookmark",
	types: ["player"],
	categoryId: binderBookmarkCategoryId,
	groupId: "binderBookmark",
	name: "3x3",
	orientation: "vertical",
	color: true,
	size: createSize(63, 330),
	printSize: {
		300: {
			size: createSize(744, 3898),
			bleedSize: createSize(815, 3969),
		},
	},
	bleed: 3,
	iconParams: ["icon", "campaignIcon"],
	playerParams: {
		story: true,
	},
};

const a4: DividerLayout = {
	...layout,
	id: "binder-bookmark-a4",
	groupId: "a4",
	name: "A4",
	size: createSize(63, 291),
	printSize: {
		300: {
			size: createSize(744, 3437),
			bleedSize: createSize(815, 3508),
		},
	},
};

const duo: DividerLayout = {
	...layout,
	id: "binder-bookmark-duo",
	groupId: "duo",
	name: "2x2",
	size: createSize(63, 240),
	printSize: {
		300: {
			size: createSize(744, 2835),
			bleedSize: createSize(815, 2906),
		},
	},
};

const pocket: DividerLayout = {
	...layout,
	id: "binder-bookmark-pocket",
	groupId: "pocket",
	name: "divider.binder-bookmark.pocket.name",
	previewName: "divider.binder-bookmark.pocket.name",
	description: "divider.binder-bookmark.pocket.description",
	image: "/images/divider/render/binder-bookmark/pocket.avif",
	size: createSize(63, 105),
	printSize: {
		300: {
			size: createSize(744, 1240),
			bleedSize: createSize(815, 1311),
		},
	},
};

const card: DividerLayout = {
	...layout,
	id: "binder-bookmark-card",
	groupId: "card",
	name: "divider.binder-bookmark.card.name",
	previewName: "divider.binder-bookmark.card.name",
	description: "divider.binder-bookmark.card.description",
	image: null,
	size: createSize(63, 88),
	printSize: {
		300: {
			size: createSize(744, 1039),
			bleedSize: createSize(815, 1110),
		},
	},
};

const ffg: DividerLayout = {
	...layout,
	id: "binder-bookmark-ffg",
	groupId: "ffg",
	name: "divider.binder-bookmark.ffg.name",
	previewName: "divider.binder-bookmark.ffg.name",
	description: "divider.binder-bookmark.ffg.description",
	image: null,
	size: createSize(61.5, 88),
	printSize: {
		300: {
			size: createSize(726, 1039),
			bleedSize: createSize(797, 1110),
		},
	},
};

export const binderBookmarkLayouts: DividerLayout[] = [
	layout,
	a4,
	duo,
	pocket,
	card,
	ffg,
];
