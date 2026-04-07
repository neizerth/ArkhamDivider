import type { ArkhamStarterDividerProps } from "../../../model";

export const show3mmDividerStrip = (divider: ArkhamStarterDividerProps) => {
	return divider.layoutType !== "investigator" && divider.story;
};
