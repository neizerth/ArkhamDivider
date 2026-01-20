import type { Story, StoryWithRelations } from "@/modules/story/shared/model";
import type { Side, Single } from "@/shared/model";
import type { DividerCategory } from "./category";
import type { DividerLayout } from "./layout";

export type Investigator = Single<Story["investigators"]>;

export type CardType = "asset" | "event" | "skill";

export type Faction =
	| "mystic"
	| "guardian"
	| "rogue"
	| "neutral"
	| "seeker"
	| "survivor"
	| "multiclass";

export type XPCost = {
	value: string;
	max?: number;
	level: number;
	fixed: boolean;
};

export type DividerSubtype =
	| "faction"
	| "investigators"
	| "card"
	| "weakness"
	| "basic_weakness"
	| "bonded"
	| "customizations"
	| "upgrade"
	| "ally";

export type Divider<Params = void> = {
	id: string;
	side: Side;
	layout: DividerLayout;
	category: DividerCategory;
	title: string;
	icon?: string;
	params?: Params;
} & (
	| {
			type: "player";
			subtype: DividerSubtype;
			faction: Faction;
			cardType?: CardType;
			story?: StoryWithRelations;
			xpCost?: XPCost;
	  }
	| {
			type: "scenario" | "campaign" | "encounter";
			story: StoryWithRelations;
			cardsCount?: number;
	  }
	| {
			type: "investigator";
			story: StoryWithRelations;
			investigator: Investigator;
	  }
);
