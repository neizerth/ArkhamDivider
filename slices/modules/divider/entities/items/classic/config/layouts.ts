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
	name: "Classic",
	orientation: "horizontal",
	color: false,
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
	cardCountSupport: true,
	campaignIconSupport: true,
	params: {
		background: "/images/divider/background/classic/horizontal.png",
	},
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
	size: createSize(88, 76),
	printSize: {
		300: {
			size: createSize(1039, 900),
			bleedSize: createSize(1110, 971),
		},
		600: {
			size: createSize(2079, 1800),
			bleedSize: createSize(2220, 1942),
		},
	},
};

const horizontalHQBW: DividerLayout = {
	...horizontalHQ,
	id: "classic-horizontal-hq-bw",
	color: false,
};

const verticalLayout: DividerLayout = {
	id: "classic-vertical",
	types,
	categoryId: classicCategoryId,
	groupId: "classic-vertical",
	name: "Classic",
	image: "/images/divider/render/classic.avif",
	orientation: "vertical",
	color: false,
	size: createSize(63, 100),
	printSize: {
		300: {
			size: createSize(744, 1181),
			bleedSize: createSize(815, 1252),
		},
	},
	bleed: 3,
};

const verticalBW: DividerLayout = {
	...verticalLayout,
	id: "classic-vertical-bw",
	color: false,
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
};

const vertical65x100BW: DividerLayout = {
	...vertical65x100,
	id: "classic-vertical-65x100-bw",
	color: false,
};

export const classicLayouts: DividerLayout[] = [
	horizontalLayout,
	horizontalHQ,
	horizontalBW,
	horizontalHQBW,
	verticalLayout,
	verticalBW,
	vertical65x100,
	vertical65x100BW,
];
