import type {
	Divider,
	ScenarioDividerSortBy,
} from "@/modules/divider/shared/model";

const TYPE_ORDER: Record<string, number> = {
	campaign: 0,
	scenario: 1,
	encounter: 2,
};

export const sortScenarioDividers = (
	dividers: Divider[],
	sortBy: ScenarioDividerSortBy = "type",
): Divider[] => {
	const list = [...dividers];

	switch (sortBy) {
		case "type":
			return list.toSorted(
				(a, b) =>
					(TYPE_ORDER[a.type] ?? Infinity) - (TYPE_ORDER[b.type] ?? Infinity),
			);
		case "name":
			return list.toSorted((a, b) => a.title.localeCompare(b.title));
		case "cardsCountAsc":
			return list.toSorted(
				(a, b) => (a.cardsCount ?? Infinity) - (b.cardsCount ?? Infinity),
			);
		case "cardsCountDesc":
			return list.toSorted(
				(a, b) => (b.cardsCount ?? Infinity) - (a.cardsCount ?? Infinity),
			);
		default:
			return list;
	}
};
