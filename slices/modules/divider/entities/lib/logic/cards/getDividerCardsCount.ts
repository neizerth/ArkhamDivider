import type { Divider } from "@/modules/divider/shared/model";

export const getDividerCardsCount = <T = void>(divider: Divider<T>) => {
	if (divider.layoutType === "scenario") {
		return divider.cardsCount;
	}
	return;
};
