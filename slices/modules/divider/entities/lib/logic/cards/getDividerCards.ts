import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { isScenarioDivider } from "../type";

export const getDividerCards = (divider: DividerWithRelations) => {
	if (!isScenarioDivider(divider)) {
		return [];
	}

	return divider.cards ?? [];
};
