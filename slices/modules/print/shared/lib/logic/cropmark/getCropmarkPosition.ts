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
}: Options) => {
	const mm = multiply(size);

	const offset = mm(CROPMARK_OFFSET + bleed);

	const lineSize = mm(CROPMARK_SIZE);
	const lineWidth = mm(CROPMARK_WIDTH);

	const width = type === "horizontal" ? lineWidth : lineSize;
	const height = type === "vertical" ? lineWidth : lineSize;

	const baseOptions = {
		width,
		height,
		left: 0,
		top: 0,
	};

	// When bleed=0: gap for outer left/top; central vertical (not first col) on boundary = lefter
	const gap = bleed === 0 ? mm(CROPMARK_OFFSET) : lineWidth;
	const topOffset = bleed === 0 ? mm(CROPMARK_OFFSET * 2) : offset;
	// Left: horizontal extends outward (-offset); vertical: gap, or 0 for central (bleed=0, not first col)
	const leftX = type === "horizontal" ? -offset : gap;
	// Top: horizontal at gap from edge, vertical extends outward (higher when bleed=0)
	const topY = type === "horizontal" ? gap : -topOffset;
	// Bottom: horizontal offset above seam, vertical offset below edge (same distance as other corners)
	const bottomY =
		type === "horizontal"
			? mm(unitSize.height) - lineWidth
			: mm(unitSize.height) + lineWidth;
	// Right: horizontal offset by lineWidth from edge (same as left vertical), vertical at unit right edge
	const rightX =
		type === "horizontal"
			? mm(unitSize.width) + lineWidth
			: mm(unitSize.width) - lineWidth;

	return {
		...baseOptions,
		...(left && { left: num(left && leftX) }),
		...(right && { left: num(right && rightX) }),
		...(top && { top: num(top && topY) }),
		...(bottom && { top: num(bottom && bottomY) }),
	};
};
