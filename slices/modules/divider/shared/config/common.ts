import { range } from "ramda";
import type {
	CardSlot,
	DividerLayoutType,
	FixedXPCost,
	PlayerCardType,
} from "../model";

export const dividerTypes: DividerLayoutType[] = [
	"scenario",
	"player",
	"investigator",
];

export const cardTypes: PlayerCardType[] = ["asset", "event", "skill"];

export const cardTypeItems: Record<
	PlayerCardType,
	{ title: string; icon: string }
> = {
	asset: { title: "Asset", icon: "asset" },
	event: { title: "Event", icon: "event" },
	skill: { title: "Skill", icon: "skill" },
};

export const cardSlots: CardSlot[] = [
	"hand",
	"hand_x2",
	"body",
	"accessory",
	"arcane",
	"arcane_x2",
	"ally",
];

export const fixedXPCosts: FixedXPCost[] = range(0, 6).map((value) => {
	return {
		type: "fixed",
		name: value.toString(),
		value,
	};
});

export const cardSlotNames: Record<CardSlot, string> = {
	hand: "Hand",
	hand_x2: "Hand x2",
	arcane: "Arcane",
	arcane_x2: "Arcane x2",
	accessory: "Accessory",
	body: "Body",
	ally: "Ally",
};
