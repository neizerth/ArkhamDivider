import type { BoxPosition, BoxSize } from "../model";

export const createSquareSize = (size: number) => ({
	width: size,
	height: size,
});

export const createSize = (width: number, height: number) => ({
	width,
	height,
});

export const modifyRectSize = (
	options: { size: BoxSize; value?: number } & Partial<BoxPosition>,
) => {
	const {
		value = 0,
		top = value,
		right = value,
		bottom = value,
		left = value,
		size,
	} = options;

	const inline = left + right;
	const block = top + bottom;

	return {
		width: size.width + inline,
		height: size.height + block,
	};
};

export const getBoxSize = (size: BoxSize): string => {
	return `${size.width}x${size.height}`;
};

export const getStaticBoxGrid = (containerSize: BoxSize, unitSize: BoxSize) => {
	const { width, height } = unitSize;
	const cols = Math.floor(containerSize.width / width);
	const rows = Math.floor(containerSize.height / height);
	const units = rows * cols;

	const size = {
		// Keep sub-mm precision; rounding causes aspect-ratio drift in print.
		width: width * cols,
		height: height * rows,
	};

	return { rows, cols, units, size };
};

export const getBoxGrid = ({
	size,
	unitSize,
	padding,
}: {
	size: BoxSize;
	unitSize: BoxSize;
	padding: Partial<BoxPosition>;
}) => {
	const { top = 0, right = 0, bottom = 0, left = 0 } = padding;

	const inline = left + right;
	const block = top + bottom;

	const originalSize = {
		width: size.width - inline,
		height: size.height - block,
	};

	const original = getStaticBoxGrid(originalSize, unitSize);

	const rotatedSize = {
		width: size.height - inline,
		height: size.width - block,
	};

	const rotated = getStaticBoxGrid(
		{
			width: rotatedSize.width,
			height: rotatedSize.height,
		},
		unitSize,
	);

	if (rotated.units > original.units) {
		return {
			...rotated,
			rotated: true,
			unitSize,
		};
	}

	return {
		...original,
		rotated: false,
		unitSize,
	};
};

export const rotateBoxSize = (size: BoxSize) => ({
	width: size.height,
	height: size.width,
});

export const getRelativeBoxSize = (size: BoxSize, unitSize: BoxSize) => {
	const { width, height } = unitSize;

	return {
		// Avoid integer rounding so preview sizing matches print proportions.
		width: (width * 100) / size.width,
		height: (height * 100) / size.height,
	};
};

export const px = (value: number) => `${value}px`;

export const isBoxIncludes = (container: BoxSize, box: BoxSize) => {
	return box.width <= container.width && box.height <= container.height;
};
