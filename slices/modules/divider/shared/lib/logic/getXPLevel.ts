import type { XPCost } from "../../model";

export const getXPLevel = (xpCost?: XPCost | null) => {
	if (!xpCost) {
		return;
	}
	if (xpCost.type === "fixed") {
		return xpCost.value;
	}
	return xpCost.min;
};
