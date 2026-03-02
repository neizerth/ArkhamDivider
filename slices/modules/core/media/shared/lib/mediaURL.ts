import { isBlobUrl } from "./isBlobUrl";
import { addMedia, deleteMediaById, getMediaById } from "./media";

const urlMap = new Map<string, string>();

export const getMediaUrl = async (id?: string | null) => {
	if (!id) {
		return null;
	}
	if (!isBlobUrl(id)) {
		return null;
	}
	const url = urlMap.get(id);
	if (url) {
		return url;
	}
	const blob = await getMediaById(id);
	if (!blob) {
		return null;
	}
	const blobUrl = URL.createObjectURL(blob);
	urlMap.set(id, blobUrl);
	return blobUrl;
};

export const revokeMediaUrl = (url: string) => {
	URL.revokeObjectURL(url);

	const entry = Object.entries(urlMap).find(([_, blobUrl]) => url === blobUrl);
	if (!entry) {
		return;
	}
	const [id] = entry;

	urlMap.delete(id);
	deleteMediaById(id);
};

export const createMediaUrl = async (blob: Blob) => {
	const id = await addMedia(blob);
	return getMediaUrl(id);
};
