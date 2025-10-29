import type { BoxSize } from "../model";

export const createSize = (width: number, height: number) => ({
	width,
	height,
});

export const getBoxSize = (size: BoxSize): string => {
	return `${size.width}x${size.height}`;
};
