import type { MediaItem } from "@/modules/core/media/shared/model";
import type { Icon } from "../../model";

type Options = Omit<MediaItem, "type" | "mediaId" | "extension"> & {
	mediaId?: string | null;
	extension?: MediaItem["extension"];
};
export const createMediaIcon = (options: Options): Icon | null => {
	const { mediaId, extension } = options;
	if (!mediaId || !extension) {
		return null;
	}
	return { ...options, type: "media", mediaId, extension };
};
