import { isString } from "ramda-adjunct";
import { factions } from "../../config";
import type { Faction } from "../../model";

export const isFaction = (faction: unknown): faction is Faction => {
	if (!isString(faction)) {
		return false;
	}
	return factions.includes(faction as Faction);
};
