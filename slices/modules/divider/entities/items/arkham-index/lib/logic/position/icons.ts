import type { ArkhamIndexDividerTabSize } from "../../../model";

type Options = {
	tabWidth: number;
	tabLeft: number;
	tabSize: ArkhamIndexDividerTabSize;
	tabSideWidth: number;
	iconWidth: number;
};

export const getArkhamIndexDividerIconLeft = ({
	tabSize,
	tabLeft,
	tabWidth,
	tabSideWidth,
	iconWidth,
}: Options) => {
	if (tabSize === "full") {
		return 0.5;
	}
	if (tabSize !== 1) {
		return tabLeft + tabSideWidth * 0.7;
	}
	return tabLeft + (tabWidth - iconWidth) / 2;
};
