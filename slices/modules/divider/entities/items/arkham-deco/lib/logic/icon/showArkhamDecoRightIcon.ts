import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
} from "../../../model";
import { isArkhamDecoCompactLayout } from "../isArkhamDecoCompactLayout";

type Options = {
	divider: ArkhamDecoDividerProps;
	layout: ArkhamDecoDividerLayout;
	numericXP: boolean;
};
export const showArkhamDecoRightIcon = ({
	divider,
	layout,
	numericXP,
}: Options) => {
	const isCompact = isArkhamDecoCompactLayout(layout);
	if (isCompact) {
		return false;
	}
	if (divider.type !== "player") {
		return true;
	}
	if (!divider.xpCost) {
		return true;
	}

	if (numericXP) {
		return false;
	}

	return true;
};
