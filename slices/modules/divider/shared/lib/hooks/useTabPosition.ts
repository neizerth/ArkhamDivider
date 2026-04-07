import { useCallback } from "react";
import { useAppDispatch } from "@/shared/lib";
import { setDividerParam } from "../store";

type Options = {
	dividerId: string;
	tabIndex: number;
	tabsCount: number;
};

export const useTabPosition = ({ dividerId, tabIndex, tabsCount }: Options) => {
	const dispatch = useAppDispatch();
	const shiftLeft = useCallback(() => {
		if (tabIndex === 0) {
			return;
		}

		dispatch(
			setDividerParam({
				id: dividerId,
				key: "tabIndex",
				value: tabIndex - 1,
			}),
		);
	}, [dispatch, dividerId, tabIndex]);

	const shiftRight = useCallback(() => {
		if (tabIndex === tabsCount - 1) {
			return;
		}

		dispatch(
			setDividerParam({
				id: dividerId,
				key: "tabIndex",
				value: tabIndex + 1,
			}),
		);
	}, [dispatch, dividerId, tabIndex, tabsCount]);

	return {
		shiftLeft,
		shiftRight,
	};
};
