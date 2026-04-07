import { isNumber } from "ramda-adjunct";
import type { Side } from "@/shared/model";
import type { Divider } from "../../../model";

type Options<T extends Divider<unknown>> = {
	divider: T;
	tabsCount: number;
	defaultTabIndex?: number;
	side?: Side;
};

export const getDividerTabIndex = <T extends Divider<unknown>>(
	props: Options<T>,
) => {
	const {
		divider,
		tabsCount,
		defaultTabIndex = 0,
		side = divider.side,
	} = props;
	const params = divider.params as unknown as Record<string, unknown>;

	const tabIndex = isNumber(params?.tabIndex)
		? params.tabIndex
		: defaultTabIndex;

	if (side === "front") {
		return tabIndex;
	}

	return tabsCount - tabIndex - 1;
};
