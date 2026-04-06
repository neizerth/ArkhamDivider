import { tcgDividerStickerObjects as O } from "../config";
export const getTCGDividerStickerSideIconObject = (withXP: boolean) => {
	if (withXP) {
		return {
			...O.sideIcon,
			...O.sideIcon.withXP,
		};
	}
	return O.sideIcon;
};
