import type {
	ArkhamIndexDividerProps,
	ArkhamIndexDividerTabSize,
} from "../../../model";

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
	if (divider.layoutType === "scenario" && !showIcon) {
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
