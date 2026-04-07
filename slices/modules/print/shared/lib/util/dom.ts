import type { BoxRect } from "@/shared/model";
import { getRelativeWidthRect, round } from "@/shared/util";

type Key = keyof BoxRect;

export const getPrintNodeRect = (options: {
	node: HTMLElement;
	container: HTMLElement;
	containerWidth: number;
	precision?: number;
}) => {
	const { containerWidth, precision = 2 } = options;
	const data = getRelativeWidthRect(options);

	const keys = Object.keys(data) as Key[];

	return keys.reduce((acc, key) => {
		const px = data[key];
		acc[key] = round(px * containerWidth, precision);
		return acc;
	}, {} as BoxRect);
};
