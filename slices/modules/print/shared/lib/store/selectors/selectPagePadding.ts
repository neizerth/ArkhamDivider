import { createSelector } from "@reduxjs/toolkit";
import type { BoxPosition } from "@/shared/model";
import { sameBoxPosition } from "@/shared/util";
import { selectInternalPagePadding } from "../print";

const ZERO_PADDING: BoxPosition = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
};

const isBoxPosition = (value: unknown): value is BoxPosition => {
	if (!value || typeof value !== "object") {
		return false;
	}
	const v = value as Record<string, unknown>;
	return (
		typeof v.top === "number" &&
		typeof v.right === "number" &&
		typeof v.bottom === "number" &&
		typeof v.left === "number"
	);
};

export const selectPagePadding = createSelector(
	[selectInternalPagePadding],
	(pagePadding) => {
		if (pagePadding == null) {
			return ZERO_PADDING;
		}

		// Legacy persisted state could store a single numeric padding value.
		if (typeof pagePadding === "number") {
			return sameBoxPosition(pagePadding);
		}

		if (isBoxPosition(pagePadding)) {
			return pagePadding;
		}

		return ZERO_PADDING;
	},
);
