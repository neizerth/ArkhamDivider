import { DividerSubtype } from "./dividers";

export type IFaction = {
	id: string;
	icon: string;
	name: string;
};

export enum XPCost {
	NO_COST = -1,
	ZERO = 0,
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
}

export enum CardType {
	ALL = "all",
	SKILL = "skill",
	ASSET = "asset",
	EVENT = "event",
}

export type IXPCost = {
	value: string;
	max?: number;
	level: number;
	is_fixed: boolean;
};

export type ICardType = {
	id: string;
	name: string;
	type: CardType;
	icon?: string;
	subtype?: DividerSubtype;
};
