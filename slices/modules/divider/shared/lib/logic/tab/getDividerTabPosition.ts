type Options = {
	tabIndex: number;
	bleed: number;
	tabsCount: number;
	tabWidth: number;
};

type Position = {
	width: number;
	left?: number;
	right?: number;
};
export const getDividerTabPosition = ({
	tabIndex,
	bleed,
	tabsCount,
	tabWidth,
}: Options): Position => {
	const isFirstTab = tabIndex === 0;
	const width = tabWidth + bleed * 2;

	if (isFirstTab) {
		return {
			width,
			left: 0,
		};
	}

	const isLastTab = tabIndex === tabsCount - 1;

	if (isLastTab) {
		return {
			width,
			right: 0,
		};
	}

	return {
		width,
		left: tabIndex * (bleed + tabWidth) - bleed,
	};
};
