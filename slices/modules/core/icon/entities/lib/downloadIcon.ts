import { saveAs } from "file-saver";
import { getMediaBlob, isMediaItem } from "@/modules/core/media/shared/lib";
import { ArkhamDividerAPI } from "@/shared/api";
import type { Icon } from "../../shared/model";

export const downloadIcon = async (icon: Icon) => {
	if (isMediaItem(icon)) {
		const blob = await getMediaBlob(icon.mediaId);
		if (!blob) {
			return;
		}
		saveAs(blob, `${icon.mediaId}.svg`);
		return;
	}
	const url = ArkhamDividerAPI.getIconUrl(icon);
	const response = await fetch(url);
	const blob = await response.blob();

	const objectUrl = URL.createObjectURL(blob);
	saveAs(blob, `${icon}.svg`);

	URL.revokeObjectURL(objectUrl);
};
