import type { Icon } from "../../model";

export const createMediaIcon = (mediaId?: string | null): Icon | null => {
	if (!mediaId) {
		return null;
	}
	return {
		type: "media",
		mediaId,
	};
};
