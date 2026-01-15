import type { DividerLayoutType } from "../../model";

export const isDividerType = (
	type?: string | null,
): type is DividerLayoutType => {
	if (!type) {
		return false;
	}
	return ["scenario", "player", "investigator"].includes(type);
};
