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
	/** bleed size in mm */
	bleed: number;
	/** mm size in px or pt */
	size: number;
	/** unit size in mm */
	unitSize: BoxSize;
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

	// Left: horizontal extends outward (-offset), vertical offset by lineWidth from junction (symmetry with right edge)
	const leftX = type === "horizontal" ? -offset : lineWidth;
	// Top/bottom horizontal: offset by lineWidth from seam (same spacing as left/right verticals at junction)
	const topY = type === "horizontal" ? lineWidth : -offset;
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
