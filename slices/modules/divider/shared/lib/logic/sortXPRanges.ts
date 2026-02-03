import type { XPCost } from "../../model";

export const sortXPRanges = (ranges: XPCost[]) => {
	return ranges.sort((a, b) => getXPRangeValue(a) - getXPRangeValue(b));
};

const getXPRangeValue = (range: XPCost) => {
	if (range.type === "fixed") {
		return range.value;
	}
	return range.min;
};
