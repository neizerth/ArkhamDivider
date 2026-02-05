import { factions } from "../../config";
import type { Faction } from "../../model";

export const isFaction = (faction: string): faction is Faction => {
	return factions.includes(faction as Faction);
};
