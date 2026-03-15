import { sleeve76x88 } from "@/entities/sleeve/config";
import { largeCCG } from "@/entities/sleeve/config/sizes";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { invocation2018CategoryId } from "./common";

const horizontal: DividerLayout = {
	id: "invocation2018-horizontal",
	name: "Horizontal",
	orientation: "horizontal",
	color: true,
	size: createSize(89, 76.2),
	types: ["player", "investigator"],
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
	scenarioParams: {
		cardCount: true,
		campaignIcon: true,
	},
	playerParams: {
		numericXP: true,
	},
	iconParams: ["icon"],
};

export const invocation2018Layouts = [horizontal];
