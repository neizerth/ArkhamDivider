import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { chapter2CategoryId } from "./common";

export const chapter2Layout: DividerLayout = {
	id: "chapter2",
	types: ["scenario", "player", "investigator"],
	categoryId: chapter2CategoryId,
	groupId: "chapter2",
	name: "divider.chapter2.name",
	orientation: "horizontal",
	color: true,
	size: createSize(87, 73),
	bleed: 3,
	creasingTop: 13.7,
	printSize: {
		300: {
			size: createSize(1028, 862),
			bleedSize: createSize(1098, 933),
		},
	},
	iconParams: ["icon", "backgroundIcon"],
	compatibility: {
		chapter1Box: true,
		chapter2Box: true,
	},
};

export const chapter2Layouts = [chapter2Layout];
