import type { XPCost } from "../../../model";
import { getXPRangeName } from "./getXPRangeName";

type Options = {
	xpCost: XPCost;
	absolute?: boolean;
};
export function getXPCostRangeName({ xpCost, absolute = false }: Options) {
	if (xpCost.type === "fixed" || !absolute) {
		return xpCost.name;
	}
	const { min, max } = xpCost;
	return getXPRangeName({ min, max, absolute });
}
