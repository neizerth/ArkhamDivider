import { isFirstTab, isLastTab } from "@/modules/divider/shared/lib/logic/tab";
import { isNumber } from "@/shared/util";
import type {
	ArkhamIndexDividerLayoutObjects,
	ArkhamIndexDividerTabSize,
} from "../../../model";

type Options = {
	objects: ArkhamIndexDividerLayoutObjects;
	tabIndex: number;
	tabSize: ArkhamIndexDividerTabSize;
	tabsCount?: number;
	centerTextByTab?: boolean;
};

type TitlePosition = {
	top: number;
	left: number;
	right: number;
	height: number;
};

export const getArkhamIndexDividerContentTitleObject = ({
	objects: O,
	tabIndex,
	tabsCount,
	tabSize,
	centerTextByTab,
}: Options): TitlePosition => {
	if (
		!centerTextByTab ||
		tabSize === "full" ||
		!isNumber(tabsCount) ||
		tabSize === tabsCount
	) {
		return O.title;
	}
	const restIndex = tabsCount - tabSize;
	const restWidth = O.tab.width[restIndex] - O.tab.sideWidth * 2;

	if (isFirstTab(tabIndex)) {
		return {
			...O.title,
			right: restWidth,
		};
	}

	if (isLastTab({ tabIndex, tabsCount, tabSize })) {
		return {
			...O.title,
			left: restWidth,
		};
	}

	const halfWidth = restWidth / 2;

	return {
		...O.title,
		left: halfWidth,
		right: halfWidth,
	};
};
