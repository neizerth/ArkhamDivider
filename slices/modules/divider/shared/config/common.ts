import type { CardSlot, CardType, DividerLayoutType } from "../model";

export const dividerTypes: DividerLayoutType[] = [
	"scenario",
	"player",
	"investigator",
];

export const cardTypes: CardType[] = ["asset", "event", "skill"];

export const cardSlots: CardSlot[] = [
	"hand",
	"hand_x2",
	"body",
	"accessory",
	"arcane",
	"arcane_x2",
	"ally",
];
