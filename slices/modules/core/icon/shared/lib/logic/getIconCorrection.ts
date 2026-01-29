import type { IconPositionManifest } from "../../model";

type Options = {
	icon: string;
	manifest: IconPositionManifest;
	fontSize: number;
};
export const getIconCorrection = ({ icon, manifest, fontSize }: Options) => {
	const position = manifest[icon];
	if (!position) {
		return {
			fontSize,
			top: 0,
			left: 0,
		};
	}
	const { round } = Math;

	const top = position.top ? round(position.top * fontSize) : 0;
	const left = position.left ? round(position.left * fontSize) : 0;
	const scaledFontSize = position.scale
		? round(position.scale * fontSize)
		: fontSize;

	return {
		top,
		left,
		fontSize: scaledFontSize,
	};
};
