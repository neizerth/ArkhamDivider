import type { ArkhamIndexDividerProps } from "../../model";

export const getArkhamIndexSideText = (divider: ArkhamIndexDividerProps) => {
	if (divider.type === "scenario" && divider.scenario?.number_text) {
		return divider.scenario.number_text;
	}
	if (divider.type === "player" && divider.xpCost) {
		return divider.xpCost.name.replaceAll(" ", "");
	}
};
