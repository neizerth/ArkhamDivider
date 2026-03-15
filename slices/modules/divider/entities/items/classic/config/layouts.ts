import { largeCCG, sleeve65x100, sleeve76x88 } from "@/entities/sleeve/config";
import type {
	DividerLayout,
	DividerLayoutType,
} from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { classicCategoryId } from "./common";

const types: DividerLayoutType[] = ["scenario", "player", "investigator"];

const horizontalLayout: DividerLayout = {
	id: "classic-horizontal",
	types,
	categoryId: classicCategoryId,
	groupId: "classic-horizontal",
	name: "Reworked by @fabula_rasa",
	orientation: "horizontal",
	color: true,
	size: createSize(89, 76.2),
	printSize: {
		300: {
			size: createSize(1051, 900),
			bleedSize: createSize(1122, 971),
		},
	},
	bleed: 3,
	sleeves: [
		{
			id: sleeve76x88.id,
			size: sleeve76x88,
		},
		{
			id: largeCCG.id,
			size: largeCCG,
			description: "layout.classic.sleeve.largeCCG.description",
		},
	],
	scenarioParams: {
		cardCount: true,
		campaignIcon: true,
	},
	playerParams: {
		numericXP: true,
	},
	params: {
		background: "/images/divider/background/classic/horizontal.png",
	},
	iconParams: ["icon", "background"],
};

const horizontalBW: DividerLayout = {
	...horizontalLayout,
	id: "classic-horizontal-bw",
	color: false,
	params: {
		background: "/images/divider/background/classic/horizontal_bw.png",
	},
};

const horizontalHQ: DividerLayout = {
	...horizontalLayout,
	id: "classic-horizontal-hq",
	name: "Return To",
	size: createSize(88, 76),
	printSize: {
		300: {
			size: createSize(1039, 898),
			bleedSize: createSize(1110, 969),
		},
		600: {
			size: createSize(2079, 1795),
			bleedSize: createSize(2220, 1937),
		},
		1200: {
			size: createSize(4157, 3591),
			bleedSize: createSize(4441, 3874),
		},
	},
	params: {
		background: "/images/divider/background/classic/horizontal_hq.avif",
	},
};

const verticalLayout: DividerLayout = {
	id: "classic-vertical",
	types,
	categoryId: classicCategoryId,
	groupId: "classic-vertical",
	name: "Classic",
	image: "/images/divider/render/classic.avif",
	orientation: "vertical",
	color: true,
	size: createSize(63, 100),
	printSize: {
		300: {
			size: createSize(744, 1181),
			bleedSize: createSize(815, 1252),
		},
	},
	bleed: 3,
	iconParams: ["icon", "background"],
	params: {
		background: "/images/divider/background/classic/vertical_63.png",
	},
};

const verticalBW: DividerLayout = {
	...verticalLayout,
	id: "classic-vertical-bw",
	color: false,
	params: {
		background: "/images/divider/background/classic/vertical_63-bw.png",
	},
};

const vertical65x100: DividerLayout = {
	...verticalLayout,
	id: "classic-vertical-sleeves",
	groupId: "classic-vertical-sleeves",
	size: createSize(65, 100),
	printSize: {
		300: {
			size: createSize(768, 1181),
			bleedSize: createSize(839, 1252),
		},
	},
	sleeves: [
		{
			id: sleeve65x100.id,
			size: sleeve65x100,
		},
	],
	params: {
		background: "/images/divider/background/classic/vertical_65.png",
	},
};

const vertical65x100BW: DividerLayout = {
	...vertical65x100,
	id: "classic-vertical-65x100-bw",
	color: false,
	params: {
		background: "/images/divider/background/classic/vertical_65-bw.png",
	},
};

export const classicLayouts: DividerLayout[] = [
	horizontalHQ,
	horizontalLayout,
	horizontalBW,
	verticalLayout,
	verticalBW,
	vertical65x100,
	vertical65x100BW,
];
