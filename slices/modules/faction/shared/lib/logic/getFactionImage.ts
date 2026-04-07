import type { Faction } from "../../model";

export const getFactionImage = (faction: Faction) => {
	if (faction === "multiclass") {
		return;
	}
	return `/images/faction/${faction}.png`;
};
