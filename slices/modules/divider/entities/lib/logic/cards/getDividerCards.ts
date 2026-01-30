import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { isScenarioDivider } from "../type";

export const getDividerCards = <T = void>(divider: DividerWithRelations<T>) => {
	if (!isScenarioDivider(divider)) {
		return [];
	}

	return divider.cards ?? [];
};
