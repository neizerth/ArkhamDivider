import { isString } from "ramda-adjunct";
import type { DividerLayoutType } from "../../model";

export const isDividerType = (type?: unknown): type is DividerLayoutType => {
	if (!isString(type)) {
		return false;
	}
	return ["scenario", "player", "investigator"].includes(type);
};
