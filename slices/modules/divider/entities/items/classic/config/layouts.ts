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
	size: createSize(88, 76.2),
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
};

const horizontalBW: DividerLayout = {
	...horizontalLayout,
	id: "classic-horizontal-bw",
	color: false,
};

const horizontalHQ: DividerLayout = {
	...horizontalLayout,
	id: "classic-horizontal-hq",
};

const horizontalHQBW: DividerLayout = {
	...horizontalLayout,
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
	bleed: 3,
	position: {
		left: 2,
	},
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
	position: {
		left: 0,
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
