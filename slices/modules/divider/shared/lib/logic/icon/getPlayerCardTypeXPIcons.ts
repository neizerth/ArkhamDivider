import type { PlayerCardType } from "../../../model";

export const getPlayerCardTypeXPIcons = (cardType: PlayerCardType) => {
	const type = "cardType" as const;
	if (cardType === "skill") {
		return {
			type,
			cardType,
			levelPrefix: "s_level_",
			background: "s_frame_background",
			nullBackground: "s_level_null",
		};
	}
	return {
		type,
		cardType,
		levelPrefix: "ae_level_",
		background: "inverted_level_0",
		nullBackground: "ae_level_null",
	};
};
