import { isString } from "ramda-adjunct";
import type { Icon } from "@/modules/core/icon/shared/model";
import { sarnetskyOverlayColors } from "../../../config";

export const getSarnetskyDefaultOverlayColor = (icon?: Icon | null) => {
	if (!isString(icon)) {
		return "transparent";
	}
	return sarnetskyOverlayColors[icon];
};
