import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../model";

export const returnPosition = {
	left: percent(4),
	top: percent(-2),
};

export const prefixIcons = (prefix: string, icons: IconPositionManifest) => {
	return Object.entries(icons).reduce((acc, [key, value]) => {
		acc[`${prefix}-${key}`] = value;
		return acc;
	}, {} as IconPositionManifest);
};

export const initialIcon = {
	left: percent(4),
	top: percent(-2),
	scale: percent(90),
};
