import type { Faction } from "../../model";

export const getFactionIcon = (faction: Faction) => {
	if (faction === "mystic") {
		return "mystic_alt";
	}
	return faction;
};
