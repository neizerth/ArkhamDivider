import { isString } from "ramda-adjunct";
import type { Icon } from "../../model";

export const getIconId = (icon: Icon | null) => {
	if (!icon) {
		return;
	}
	if (isString(icon)) {
		return icon;
	}
	return icon.mediaId;
};
