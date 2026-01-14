import type { DividerType } from "../../model";

export const isDividerType = (type?: string | null): type is DividerType => {
	if (!type) {
		return false;
	}
	return ["campaign", "player", "investigator"].includes(type);
};
