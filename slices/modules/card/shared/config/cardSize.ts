import type { BoxSize } from "@/shared/model";
import type { CardSize, CardSleeveType } from "../model";

export const cardBorderRadius = 2.5;

export const cardSizeMap: Record<CardSize, BoxSize> = {
	ccg: {
		width: 63,
		height: 88,
	},
	ffg: {
		width: 61.5,
		height: 88,
	},
};

export const cardSizeWithSleeveMap: Record<CardSleeveType, BoxSize> = {
	standard: {
		width: 65,
		height: 89,
	},
	outer: {
		width: 66,
		height: 91,
	},
};
