import { tcgDividerStickerObjects as O } from "../config";

export const getTCGDividerStickerTitleObject = (withXP: boolean) => {
	if (withXP) {
		return {
			...O.title,
			...O.title.withXP,
		};
	}
	return O.title;
};
