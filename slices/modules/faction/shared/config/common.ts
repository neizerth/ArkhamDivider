import type { CardSlot, DividerSubtype } from "@/modules/divider/shared/model";
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

export const cardSlotNames: Record<CardSlot, string> = {
	hand: "Hand",
	hand_x2: "Hand x2",
	arcane: "Arcane",
	arcane_x2: "Arcane x2",
	accessory: "Accessory",
	body: "Body",
	ally: "Ally",
};

export const subtypeIcons: Partial<Record<DividerSubtype, string>> = {
	weakness: "weakness_inverted",
	basic_weakness: "basic_weakness_inverted",
	bonded: "bonded_inverted",
	customizations: "customizations_inverted",
	upgrade: "upgrade_inverted",
};
