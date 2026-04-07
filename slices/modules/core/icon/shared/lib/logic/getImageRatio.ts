import { getMediaUrl } from "@/modules/core/media/shared/lib";

export const getImageRatio = async (
	mediaId: string,
): Promise<number | undefined> => {
	const url = await getMediaUrl(mediaId);
	if (!url) {
		return;
	}
	const img = new Image();
	return new Promise((resolve, reject) => {
		img.onload = () => {
			resolve(img.naturalWidth / img.naturalHeight);
		};
		img.onerror = () => {
			reject(new Error("Failed to load image"));
		};
		img.src = url;
	});
};
