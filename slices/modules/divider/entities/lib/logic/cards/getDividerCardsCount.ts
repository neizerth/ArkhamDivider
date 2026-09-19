import type {
	Divider,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import { getDividerCards } from "./getDividerCards";

export const getDividerCardsCount = <T = void>(
	divider: Divider<T> | DividerWithRelations<T>,
) => {
	if (divider.layoutType !== "scenario") {
		return;
	}

	if (divider.type === "campaign" && "story" in divider && divider.story) {
		return getDividerCards(divider as DividerWithRelations<T>).reduce(
			(total, { size }) => total + size,
			0,
		);
	}

	return divider.cardsCount;
};
