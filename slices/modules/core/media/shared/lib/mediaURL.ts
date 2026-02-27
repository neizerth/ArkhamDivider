import { addMedia, deleteMediaById, getMediaById } from "./media";

const urlMap = new Map<string, string>();

export const getMediaURL = async (id: string) => {
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

export const revokeMediaURL = (url: string) => {
	URL.revokeObjectURL(url);

	const entry = Object.entries(urlMap).find(([_, blobUrl]) => url === blobUrl);
	if (!entry) {
		return;
	}
	const [id] = entry;

	urlMap.delete(id);
	deleteMediaById(id);
};

export const createMediaURL = async (blob: Blob) => {
	const id = await addMedia(blob);
	return getMediaURL(id);
};
