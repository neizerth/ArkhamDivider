import { isObject } from "ramda-adjunct";
import type { MediaItem } from "../../model";

export const isMediaItem = (data: unknown): data is MediaItem => {
	return isObject(data) && "type" in data && data.type === "media";
};
