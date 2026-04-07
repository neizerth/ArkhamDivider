import type { Side } from "@/shared/model";
import type { RootState } from "@/shared/store";
import { getDividerTypedTabIndex } from "../../logic/tab";
import { selectDividers } from "../dividers";

type Options = {
	id: string;
	tabsCount: number;
	defaultTabIndex?: number;
	side?: Side;
};

export const selectDividerTabIndex =
	({ id, tabsCount, defaultTabIndex, side }: Options) =>
	(rootState: RootState) => {
		const dividers = selectDividers(rootState);
		return getDividerTypedTabIndex({
			dividerId: id,
			dividers,
			tabsCount,
			defaultTabIndex,
			side,
		});
	};
