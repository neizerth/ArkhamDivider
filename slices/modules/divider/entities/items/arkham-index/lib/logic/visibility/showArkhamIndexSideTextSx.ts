import type { ArkhamIndexDividerProps } from "../../../model";

export const showArkhamIndexSideTextSx = (
	divider: ArkhamIndexDividerProps,
): boolean => {
	if (divider.type === "scenario" && divider.scenario?.number_text) {
		return true;
	}
	if (divider.type === "player" && divider.xpCost) {
		return true;
	}
	return false;
};
