import type { BoxPosition } from "../model";

export const sameBoxPosition = (size: number): BoxPosition => {
	return {
		top: size,
		left: size,
		right: size,
		bottom: size,
	};
};
