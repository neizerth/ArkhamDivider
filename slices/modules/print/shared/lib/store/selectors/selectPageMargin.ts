import { createSelector } from "@reduxjs/toolkit";
import type { BoxPosition } from "@/shared/model";
import { sameBoxPosition } from "@/shared/util";
import { selectInternalPageMargin } from "../print";

const ZERO_MARGIN: BoxPosition = {
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

export const selectPageMargin = createSelector(
	[selectInternalPageMargin],
	(pageMargin) => {
		if (pageMargin == null) {
			return ZERO_MARGIN;
		}

		// Legacy persisted state could store a single numeric value.
		if (typeof pageMargin === "number") {
			return sameBoxPosition(pageMargin);
		}

		if (isBoxPosition(pageMargin)) {
			return pageMargin;
		}

		return ZERO_MARGIN;
	},
);
