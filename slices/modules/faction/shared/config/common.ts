import type { Faction } from "../model";

export const factions: Faction[] = [
	"guardian",
	"rogue",
	"seeker",
	"mystic",
	"survivor",
	"neutral",
	"multiclass",
];

export const factionNames: Record<Faction, string> = {
	guardian: "Guardian",
	rogue: "Rogue",
	seeker: "Seeker",
	mystic: "Mystic",
	survivor: "Survivor",
	neutral: "Neutral",
	multiclass: "Multiclass",
};
