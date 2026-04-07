import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { investigatorTokensCategoryId } from "./common";

const layout: DividerLayout = {
	id: "investigator-tokens",
	types: ["investigator"],
	categoryId: investigatorTokensCategoryId,
	groupId: "investigator-tokens",
	name: "layout.investigatorTokens.standard",
	orientation: "horizontal",
	color: true,
	size: createSize(25, 25),
	printSize: {
		300: {
			size: createSize(295, 295),
			bleedSize: createSize(366, 366),
		},
	},
	bleed: 3,
	investigatorParams: {
		doubleSided: true,
		duplicateCodes: {
			"04244": 4,
			"10661": 4,
		},
	},
};

const colored: DividerLayout = {
	...layout,
	id: "investigator-tokens-colored",
	name: "layout.investigatorTokens.colored",
	color: true,
	investigatorParams: {
		duplicateCodes: {
			"04244": 4,
			"10661": 4,
		},
	},
};

export const investigatorTokensLayouts = [layout, colored];
