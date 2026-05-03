import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { carlosLemosCategoryId } from "./common";

const layout: DividerLayout = {
	id: "carlos-lemos",
	types: ["scenario", "player", "investigator"],
	categoryId: carlosLemosCategoryId,
	groupId: "carlosLemos",
	name: "Carlos Lemos",
	orientation: "horizontal",
	color: true,
	size: createSize(89, 76),
	printSize: {
		300: {
			size: createSize(89, 76),
			bleedSize: createSize(96, 83),
		},
	},
	bleed: 3,
	sleeves: [],
	iconParams: ["icon"],
};

export const carlosLemosLayouts: DividerLayout[] = [layout];
