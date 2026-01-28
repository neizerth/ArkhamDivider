import type { IconPositionManifest } from "../../model";

type Options = {
	icon: string;
	manifest: IconPositionManifest;
	fontSize: number;
};
export const getIconCorrectionSx = ({ icon, manifest, fontSize }: Options) => {
	const position = manifest[icon];
	if (!position) {
		return {
			fontSize,
		};
	}
	const { round } = Math;

	const top = position.top && round(position.top * fontSize);
	const left = position.left && round(position.left * fontSize);
	const scaledFontSize = position.scale
		? round(position.scale * fontSize)
		: fontSize;

	return {
		top,
		left,
		fontSize: scaledFontSize,
	};
};
