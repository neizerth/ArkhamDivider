import type { BoxSize } from "../model";

export const createSize = (width: number, height: number) => ({
	width,
	height,
});

export const expandRectSize = (size: BoxSize, value: number) => {
	return {
		width: size.width + value * 2,
		height: size.height + value * 2,
	};
};

export const getBoxSize = (size: BoxSize): string => {
	return `${size.width}x${size.height}`;
};

export const getStaticBoxGrid = (containerSize: BoxSize, unitSize: BoxSize) => {
	const { width, height } = unitSize;
	const rows = Math.floor(containerSize.width / width);
	const cols = Math.floor(containerSize.height / height);
	const units = rows * cols;

	const size = {
		width: Math.round(width * rows),
		height: Math.round(height * cols),
	};

	return { rows, cols, units, size };
};

export const getBoxGrid = (size: BoxSize, unitSize: BoxSize) => {
	const original = getStaticBoxGrid(size, unitSize);
	const rotated = getStaticBoxGrid(
		{
			width: size.height,
			height: size.width,
		},
		unitSize,
	);

	if (rotated.units > original.units) {
		return {
			...rotated,
			rotated: true,
		};
	}

	return {
		...original,
		rotated: false,
	};
};

export const rotateBoxSize = (size: BoxSize) => ({
	width: size.height,
	height: size.width,
});

export const getRelativeBoxSize = (size: BoxSize, unitSize: BoxSize) => {
	const { width, height } = unitSize;

	return {
		width: Math.round((width * 100) / size.width),
		height: Math.round((height * 100) / size.height),
	};
};

export const percentage = (value: number) => `${value}%`;
