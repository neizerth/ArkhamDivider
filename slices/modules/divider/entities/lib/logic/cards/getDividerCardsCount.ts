import type { Divider } from "@/modules/divider/shared/model";
import { isScenarioDivider } from "../type";

export const getDividerCardsCount = <T = void>(divider: Divider<T>) => {
	if (isScenarioDivider(divider)) {
		return divider.cardsCount;
	}
	return;
};
