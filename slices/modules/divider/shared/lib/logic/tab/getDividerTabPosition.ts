type Options = {
	tabIndex: number;
	bleed: number;
	tabsCount: number;
	tabWidth: number;
	tabSize?: number;
	offset?: number;
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
	tabSize = 1,
	offset = 0,
}: Options): Position => {
	const isFirst = isFirstTab(tabIndex);
	const width = tabWidth + bleed * 2;

	if (isFirst) {
		return {
			width,
			left: offset,
		};
	}

	const isLast = isLastTab({ tabIndex, tabsCount, tabSize });

	if (isLast) {
		return {
			width,
			right: offset,
		};
	}

	const left = tabIndex * tabWidth;

	return {
		width,
		left,
	};
};

export const isFirstTab = (tabIndex: number) => {
	return tabIndex === 0;
};

export const isLastTab = ({
	tabIndex,
	tabsCount,
	tabSize,
}: {
	tabIndex: number;
	tabsCount: number;
	tabSize: number;
}) => {
	const restIndex = tabsCount - tabSize;
	return tabIndex === restIndex;
};
