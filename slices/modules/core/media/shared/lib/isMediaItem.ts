import { isObject } from "ramda-adjunct";
import type { MediaItem } from "../model";

export const isMediaItem = (icon: unknown): icon is MediaItem => {
	return isObject(icon) && "type" in icon && icon.type === "media";
};
