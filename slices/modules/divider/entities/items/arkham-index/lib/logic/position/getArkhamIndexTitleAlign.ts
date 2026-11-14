import type { ArkhamIndexDividerTabSize } from "../../../model";

type Align = "left" | "center" | "right";

type Options = {
	showIcon: boolean;
	tabSize: ArkhamIndexDividerTabSize;
	tabIndex: number;
	centerTextByTab?: boolean;
};
export const getArkhamIndexTitleAlign = ({
	showIcon,
	centerTextByTab,
}: Options): Align => {
	if (centerTextByTab) {
		return "center";
	}
	return showIcon ? "left" : "center";
};
