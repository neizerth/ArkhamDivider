import { deleteMediaById, getMediaById, getMediaIds } from "./media";

const urlMap = new Map<string, string>();

export const getMediaUrl = async (id?: string | null) => {
	if (!id) {
		return null;
	}
	const url = urlMap.get(id);
	if (url) {
		return url;
	}
	const blob = await getMediaBlob(id);
	if (!blob) {
		return null;
	}
	const blobUrl = URL.createObjectURL(blob);
	urlMap.set(id, blobUrl);
	return blobUrl;
};

export const getMediaBlob = async (id?: string | null) => {
	if (!id) {
		return null;
	}
	const blob = await getMediaById(id);
	if (!blob) {
		return null;
	}
	return blob;
};

export const revokeMediaById = (id: string) => {
	urlMap.delete(id);
	deleteMediaById(id);

	const url = urlMap.get(id);
	if (!url) {
		return;
	}
	URL.revokeObjectURL(url);
};

export const revokeMediaExceptFor = async (usedIds: string[]) => {
	const allIds = await getMediaIds();
	const unusedIds = allIds.filter((id) => !usedIds.includes(id));
	for (const id of unusedIds) {
		revokeMediaById(id);
	}
};
