import type { BoxPosition } from "../model";

export const sameBoxPosition = (size: number): BoxPosition => {
	return {
		top: size,
		left: size,
		right: size,
		bottom: size,
	};
};

export const isUniformBoxPosition = ({
	top,
	right,
	bottom,
	left,
}: BoxPosition) => {
	return top === right && right === bottom && bottom === left;
};
