import type { ArkhamIndexDividerTabSize } from "../../../model";

type Align = "left" | "center" | "right";

type Options = {
	showIcon: boolean;
	tabSize: ArkhamIndexDividerTabSize;
	tabIndex: number;
};
export const getArkhamIndexTitleAlign = ({ showIcon }: Options): Align => {
	return showIcon ? "left" : "center";
};
