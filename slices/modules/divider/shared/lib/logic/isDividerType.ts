import type { DividerType } from "../../model";

export const isDividerType = (type: string): type is DividerType => {
	return ["campaign", "player", "investigator"].includes(type);
};
