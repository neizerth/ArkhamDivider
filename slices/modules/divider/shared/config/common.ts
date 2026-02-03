import { range } from "ramda";
import type {
	CardSlot,
	CardType,
	DividerLayoutType,
	FixedXPCost,
} from "../model";

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

export const fixedXPCosts: FixedXPCost[] = range(0, 6).map((value) => {
	return {
		type: "fixed",
		name: value.toString(),
		value,
	};
});
