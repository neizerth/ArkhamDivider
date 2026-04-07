import { getDividerCardsCount } from "@/modules/divider/entities/lib";
import type { SarnetskyBandProps } from "../../model";

export function getSarnetskyBandTitleOffset(divider: SarnetskyBandProps) {
	if (divider.type !== "scenario") {
		return 0;
	}
	if (!divider.story) {
		return 0;
	}

	const cardsCount = getDividerCardsCount(divider) ?? 0;

	return cardsCount * 0.234;
}
