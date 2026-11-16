/** Normalize legacy scenario divider sortBy keys in persisted state. */
// biome-ignore lint/suspicious/noExplicitAny: Redux Persist migration
export default function normalizeScenarioDividerSortBy(state?: any) {
	const sortBy = state?.divider?.scenarioParams?.sortBy;
	if (typeof sortBy !== "string") {
		return state;
	}

	const legacy: Record<string, string> = {
		nameAsc: "name",
		nameDesc: "name",
		cardsCountAsc: "cardsCount",
		cardsCountDesc: "cardsCount",
		minCardNumberAsc: "minCardNumber",
		minCardNumberDesc: "minCardNumber",
	};

	const valid = new Set(["type", "name", "minCardNumber", "cardsCount"]);
	const next = valid.has(sortBy) ? sortBy : (legacy[sortBy] ?? "type");

	if (next === sortBy) {
		return state;
	}

	return {
		...state,
		divider: {
			...state.divider,
			scenarioParams: {
				...state.divider.scenarioParams,
				sortBy: next,
			},
		},
	};
}
