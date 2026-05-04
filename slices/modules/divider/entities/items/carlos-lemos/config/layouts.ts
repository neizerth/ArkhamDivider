import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { carlosLemosCategoryId } from "./common";

const layout: DividerLayout = {
	id: "carlos-lemos",
	types: ["scenario"],
	categoryId: carlosLemosCategoryId,
	groupId: "vertical",
	name: "Carlos Lemos",
	orientation: "vertical",
	color: true,
	size: createSize(69, 108),
	printSize: {
		300: {
			size: createSize(815, 1276),
			bleedSize: createSize(886, 1346),
		},
	},
	bleed: 3,
	sleeves: [],
	iconParams: ["icon"],
};

export const carlosLemosLayouts: DividerLayout[] = [layout];
