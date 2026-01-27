import type { Divider } from "@/modules/divider/shared/model";
import { isScenarioDivider } from "../type";

export const getDividerCardsCount = (divider: Divider) => {
	if (isScenarioDivider(divider)) {
		return divider.cardsCount;
	}
	return;
};
