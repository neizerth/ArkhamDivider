import { sleeve76x88 } from "@/entities/sleeve/config";
import { largeCCG, sleeve65x100 } from "@/entities/sleeve/config/sizes";
import type {
	DividerLayout,
	DividerLayoutType,
} from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { invocation2018CategoryId } from "./common";

const types: DividerLayoutType[] = ["player", "investigator"];

const horizontal: DividerLayout = {
	id: "invocation2018-horizontal",
	name: "Invocation 2018",
	orientation: "horizontal",
	color: true,
	size: createSize(89, 76.2),
	types,
	categoryId: invocation2018CategoryId,
	groupId: "invocation2018-horizontal",
	bleed: 3,
	printSize: {
		300: {
			size: createSize(1051, 900),
			bleedSize: createSize(1122, 971),
		},
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
	playerParams: {
		numericXP: true,
	},
	iconParams: ["icon"],
};

const vertical63: DividerLayout = {
	id: "invocation2018-vertical",
	types,
	categoryId: invocation2018CategoryId,
	groupId: "invocation2018-vertical",
	name: "63x100",
	image: "/images/divider/render/invocation-2018.avif",
	orientation: "vertical",
	color: true,
	size: createSize(63, 100),
	printSize: {
		300: {
			size: createSize(744, 1181),
			bleedSize: createSize(815, 1252),
		},
	},
	playerParams: {
		numericXP: true,
	},
	bleed: 3,
	iconParams: ["icon"],
};

const vertical65: DividerLayout = {
	...vertical63,
	id: "invocation2018-vertical-65",
	name: "65x100",
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
	playerParams: {
		numericXP: true,
	},
};
export const invocation2018Layouts = [horizontal, vertical63, vertical65];
