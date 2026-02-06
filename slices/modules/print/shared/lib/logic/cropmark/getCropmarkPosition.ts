import { multiply } from "ramda";
import { isNumber } from "ramda-adjunct";
import type { BoxSize } from "@/shared/model";
import {
	CROPMARK_OFFSET,
	CROPMARK_SIZE,
	CROPMARK_WIDTH,
} from "../../../config";
import type { CropmarkPosition, CropmarkType } from "../../../model";

type Options = CropmarkPosition & {
	type: CropmarkType;
	bleed: number;
	bleedEnabled: boolean;
	size: number;
	unitSize: BoxSize;
	/** first column (bleed=0: outer left in margin, central on boundary) */
	isFirstCol?: boolean;
};

const num = (value: unknown) => {
	if (isNumber(value)) {
		return value;
	}
	return undefined;
};

export const getCropmarkPosition = ({
	left,
	right,
	top,
	bottom,
	size,
	unitSize,
	type,
	bleed,
	bleedEnabled,
}: Options) => {
	const mm = multiply(size);

	const offset = mm(CROPMARK_OFFSET + bleed);

	const lineSize = mm(CROPMARK_SIZE);
	const lineWidth = mm(CROPMARK_WIDTH);

	let width = 0;
	let height = 0;
	let leftX = 0;
	let rightX = 0;
	let topY = 0;
	let bottomY = 0;

	if (type === "horizontal") {
		const yOffset = bleedEnabled ? lineWidth : 0;
		width = lineWidth;
		height = lineSize;

		leftX = -offset;
		rightX = mm(unitSize.width) + lineWidth;
		topY = yOffset;
		bottomY = mm(unitSize.height) - yOffset;
	}

	if (type === "vertical") {
		const xOffset = bleedEnabled ? lineWidth : 0;
		width = lineSize;
		height = lineWidth;

		leftX = xOffset;
		rightX = mm(unitSize.width) - xOffset;
		topY = -offset;
		bottomY = mm(unitSize.height) + lineWidth;
	}

	return {
		width,
		height,
		left: 0,
		top: 0,
		...(left && { left: num(left && leftX) }),
		...(right && { left: num(right && rightX) }),
		...(top && { top: num(top && topY) }),
		...(bottom && { top: num(bottom && bottomY) }),
	};
};
