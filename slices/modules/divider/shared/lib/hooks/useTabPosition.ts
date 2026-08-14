import { useCallback } from "react";
import { useDividerParam } from "./useDividerParam";

type Options = {
	dividerId: string;
	tabIndex: number;
	tabsCount: number;
};

export const useTabPosition = ({ dividerId, tabIndex, tabsCount }: Options) => {
	const setTabIndex = useDividerParam({
		dividerId,
		key: "tabIndex",
	});
	const shiftLeft = useCallback(() => {
		if (tabIndex === 0) {
			return;
		}

		setTabIndex(tabIndex - 1);
	}, [setTabIndex, tabIndex]);

	const shiftRight = useCallback(() => {
		if (tabIndex === tabsCount - 1) {
			return;
		}

		setTabIndex(tabIndex + 1);
	}, [setTabIndex, tabIndex, tabsCount]);

	const canShiftLeft = tabIndex > 0;
	const canShiftRight = tabIndex < tabsCount - 1;

	return {
		shiftLeft,
		shiftRight,
		canShiftLeft,
		canShiftRight,
	};
};
