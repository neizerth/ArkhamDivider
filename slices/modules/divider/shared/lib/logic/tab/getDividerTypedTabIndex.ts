import { propEq } from "ramda";
import type { Side } from "@/shared/model";
import { whereId } from "@/shared/util";
import type { Divider } from "../../../model";
import { getDividerTabIndex } from "./getDividerTabIndex";

type Options<T extends Divider<unknown>> = {
	dividerId: string;
	dividers: T[];
	tabsCount: number;
	defaultTabIndex?: number;
	side?: Side;
};
export const getDividerTypedTabIndex = <T extends Divider<unknown>>(
	props: Options<T>,
) => {
	const { dividerId, dividers, tabsCount, defaultTabIndex, side } = props;
	const divider = dividers.find(whereId(dividerId));

	if (!divider) {
		return defaultTabIndex ?? 0;
	}

	const typedDividers = dividers.filter(propEq(divider.type, "type"));
	const dividerTypeIndex = typedDividers.indexOf(divider) % tabsCount;
	const defaultIndex = defaultTabIndex ?? dividerTypeIndex;

	return getDividerTabIndex({
		divider,
		tabsCount,
		defaultTabIndex: defaultIndex,
		side,
	});
};
