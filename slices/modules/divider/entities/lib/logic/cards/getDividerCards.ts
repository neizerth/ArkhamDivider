import type { DividerWithRelations } from "@/modules/divider/shared/model";

export const getDividerCards = <T = void>(divider: DividerWithRelations<T>) => {
	if (divider.layoutType !== "scenario") {
		return [];
	}

	return divider.cards ?? [];
};
