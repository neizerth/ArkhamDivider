import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../model";

export const returnPosition = {};

export const prefixIcons = (prefix: string, icons: IconPositionManifest) => {
	return Object.entries(icons).reduce((acc, [key, value]) => {
		acc[`${prefix}-${key}`] = value;
		return acc;
	}, {} as IconPositionManifest);
};

export const initialIcon = {
	scale: percent(90),
};
