import type { Icon } from "../../model";

type Options = {
	mediaId?: string;
	mime: string;
};

export const createMediaIcon = (options: Options): Icon | null => {
	const { mediaId } = options;
	if (!mediaId) {
		return null;
	}
	return { ...options, type: "media", mediaId };
};
