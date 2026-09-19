import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { getCampaignCards } from "@/modules/story/entities/lib";

export const getDividerCards = <T = void>(divider: DividerWithRelations<T>) => {
	if (divider.layoutType !== "scenario") {
		return [];
	}

	if (divider.type === "campaign" && divider.story) {
		return getCampaignCards(divider.story);
	}

	return divider.cards ?? [];
};
