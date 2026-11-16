import type { ScenarioDividerSortBy } from "../../model";

const SORT_BY_VALUES = new Set<ScenarioDividerSortBy>([
	"type",
	"name",
	"minCardNumber",
	"cardsCount",
]);

const LEGACY_SORT_BY: Record<string, ScenarioDividerSortBy> = {
	nameAsc: "name",
	nameDesc: "name",
	cardsCountAsc: "cardsCount",
	cardsCountDesc: "cardsCount",
	minCardNumberAsc: "minCardNumber",
	minCardNumberDesc: "minCardNumber",
};

export const DEFAULT_SCENARIO_DIVIDER_SORT_BY: ScenarioDividerSortBy = "type";

export const normalizeScenarioDividerSortBy = (
	value?: string | null,
): ScenarioDividerSortBy => {
	if (value && SORT_BY_VALUES.has(value as ScenarioDividerSortBy)) {
		return value as ScenarioDividerSortBy;
	}

	if (value && LEGACY_SORT_BY[value]) {
		return LEGACY_SORT_BY[value];
	}

	return DEFAULT_SCENARIO_DIVIDER_SORT_BY;
};
