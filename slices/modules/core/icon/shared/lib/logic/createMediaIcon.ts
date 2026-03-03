import { isString } from "ramda-adjunct";
import { addMedia } from "@/modules/core/media/shared/lib";
import type { Icon, MediaIcon } from "../../model";
import { getImageExtensionByMime } from "./getImageExtensionByMime";
import { getImageRatio } from "./getImageRatio";

export type CreateMediaIconOptions = {
	file: File;
	defaultIcon?: Icon | null;
};

export async function createMediaIcon(
	options: CreateMediaIconOptions,
): Promise<MediaIcon | null> {
	const { file, defaultIcon } = options;
	const mediaId = await addMedia(file);
	const mime = file.type;
	const extension = getImageExtensionByMime(mime);

	const ratio = await getImageRatio(mediaId);

	if (!ratio) {
		return null;
	}
	const fallback = isString(defaultIcon) ? defaultIcon : null;

	return {
		type: "media",
		mediaId,
		mime,
		extension,
		ratio,
		fallback,
	};
}
