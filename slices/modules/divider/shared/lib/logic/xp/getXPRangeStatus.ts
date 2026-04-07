import type { XPCost, XPRangeStatus } from "../../../model";
import { getXPLevel } from "./getXPLevel";

export function getXPRangeStatus(i: number, xpCost: XPCost): XPRangeStatus {
	const defaultLevel = getXPLevel(xpCost) ?? 0;
	const level = defaultLevel - 1;
	if (i < level) {
		return "inactive";
	}
	if (i === level) {
		return "active";
	}
	if (xpCost.type === "range" && i < xpCost.max) {
		return "range";
	}
	return "inactive";
}
