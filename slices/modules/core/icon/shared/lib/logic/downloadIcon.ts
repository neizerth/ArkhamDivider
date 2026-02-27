import { saveAs } from "file-saver";
import { ArkhamDividerAPI } from "@/shared/api";

export const downloadIcon = async (icon: string) => {
	const url = ArkhamDividerAPI.getIconUrl(icon);
	const response = await fetch(url);
	const blob = await response.blob();

	const objectUrl = URL.createObjectURL(blob);
	saveAs(blob, `${icon}.svg`);

	URL.revokeObjectURL(objectUrl);
};
