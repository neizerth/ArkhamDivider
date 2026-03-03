import { v4 } from "uuid";
import { mediaStore } from "../config";

export const addMedia = async (media: Blob) => {
	const id = v4();
	await mediaStore.setItem<Blob>(id, media);
	return id;
};

export const getMediaById = async (id: string) => {
	const mediaUrl = await mediaStore.getItem<Blob>(id);
	return mediaUrl;
};

export const getMediaIds = async () => {
	return await mediaStore.keys();
};

export const deleteMediaById = async (id: string) => {
	await mediaStore.removeItem(id);
};
