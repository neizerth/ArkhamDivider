import type {
	ArkhamIndexDividerProps,
	ArkhamIndexDividerTabSize,
} from "../../model";

type Options = {
	divider: ArkhamIndexDividerProps;
	tabSize: ArkhamIndexDividerTabSize;
	showIcon: boolean;
};

export const showArkhamIndexDividerTabTitle = ({
	divider,
	tabSize,
	showIcon,
}: Options) => {
	const isLargeTab = tabSize === "full" || tabSize > 2;
	if (divider.layoutType === "scenario" && showIcon && !isLargeTab) {
		return false;
	}
	if (divider.layoutType === "investigator" && tabSize === 1) {
		return false;
	}
	if (tabSize === 1 && showIcon) {
		return false;
	}
	return true;
};
