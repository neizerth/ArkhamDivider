export const getDividerCardsNumbers = (cards?: Record<number, number>) => {
	if (!cards) {
		return [];
	}

	return Object.entries(cards).map(([number, count]) => {
		return {
			number,
			count,
		};
	});
};
