import { ascend, descend, sortWith } from "ramda";
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
			return sortWith([ascend(getTypeOrd), ascend(getNameOrd)], list);
		case "nameAsc":
			return sortWith([ascend(getNameOrd), ascend(getTypeOrd)], list);
		case "nameDesc":
			return sortWith([descend(getNameOrd), ascend(getTypeOrd)], list);
		case "cardsCountAsc":
			return sortWith(
				[ascend(getCardsCountOrd), ascend(getTypeOrd), ascend(getNameOrd)],
				list,
			);
		case "cardsCountDesc":
			return sortWith(
				[descend(getCardsCountOrd), ascend(getTypeOrd), ascend(getNameOrd)],
				list,
			);
		default:
			return list;
	}
};

const getTypeOrd = (divider: Divider) => {
	return TYPE_ORDER[divider.type] ?? Infinity;
};

const getNameOrd = (divider: Divider) => divider.title;

const getCardsCountOrd = (divider: Divider) => divider.cardsCount ?? Infinity;
