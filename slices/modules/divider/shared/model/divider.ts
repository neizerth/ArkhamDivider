import type { Story, StoryWithRelations } from "@/modules/story/shared/model";
import type { Side, Single } from "@/shared/model";

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

export type ScenarioDividerData = {
	type: "scenario" | "campaign" | "encounter";
	storyCode: string;
	cardsCount?: number;
};

export type PlayerDividerData = {
	type: "player";
	subtype: DividerSubtype;
	faction: Faction;
	cardType?: CardType;
	storyCode?: string;
	xpCost?: XPCost;
};

export type InvestigatorDividerData = {
	type: "investigator";
	storyCode: string;
	investigator: Investigator;
};

export type BaseDividerData<Params = void> = {
	id: string;
	side: Side;
	title: string;
	icon?: string;
	params?: Params;
};

export type Divider<Params = void> = BaseDividerData<Params> &
	(PlayerDividerData | ScenarioDividerData | InvestigatorDividerData);

export type DividerWithRelations<Params = void> = BaseDividerData<Params> &
	(
		| (PlayerDividerData & {
				story?: StoryWithRelations;
		  })
		| (ScenarioDividerData & {
				story: StoryWithRelations;
		  })
		| (InvestigatorDividerData & {
				story: StoryWithRelations;
		  })
	);
