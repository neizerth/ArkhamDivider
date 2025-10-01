import { largeCCG, sleeve65x100, sleeve76x88 } from "@/entities/sleeve/config";
import type {
	DividerCategory,
	DividerLayout,
} from "@/modules/divider/shared/model";

const categoryId = "classic";

const horizontalLayout: DividerLayout = {
	id: "classic-horizontal",
	categoryId: categoryId,
	name: "Classic",
	orientation: "horizontal",
	color: false,
	width: 89,
	height: 76,
	bleed: {
		width: 97,
		height: 84,
		top: 3.2,
		left: 4,
		right: 4.1,
		bottom: 4.6,
	},
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
	categoryId: categoryId,
	name: "63x100",
	image: "/images/divider/render/classic.avif",
	orientation: "vertical",
	color: false,
	height: 100,
	width: 63,
	bleed: {
		width: 71,
		height: 107,
		top: 3.2,
		left: 4.6,
		right: 3.4,
		bottom: 3.8,
	},
	sleeves: [],
};

const verticalBW: DividerLayout = {
	...verticalLayout,
	id: "classic-vertical-bw",
	color: false,
};

const vertical65x100: DividerLayout = {
	...verticalLayout,
	id: "classic-vertical-sleeves",
	height: 100,
	width: 65,
	bleed: {
		width: 71,
		height: 107,
		top: 3.2,
		left: 3.3,
		right: 4.7,
		bottom: 3.8,
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

const classicLayouts: DividerLayout[] = [
	horizontalLayout,
	horizontalHQ,
	horizontalBW,
	horizontalHQBW,
	verticalLayout,
	verticalBW,
	vertical65x100,
	vertical65x100BW,
];

export const classicCategory: DividerCategory = {
	id: categoryId,
	name: "Classic",
	image: "/images/divider/render/classic.avif",
	layouts: classicLayouts,
};
