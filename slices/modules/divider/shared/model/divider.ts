import type { EncounterSetTypeEntry } from "@/modules/encounterSet/shared/model";
import type { Faction } from "@/modules/faction/shared/model";
import type { Story, StoryWithRelations } from "@/modules/story/shared/model";
import type { Side, Single } from "@/shared/model";

export type Investigator = Single<Story["investigators"]>;

export type CardType = "asset" | "event" | "skill";

export type CardSlot =
	| "hand"
	| "hand_x2"
	| "arcane"
	| "arcane_x2"
	| "accessory"
	| "body"
	| "ally";

export type XPCost = FixedXPCost | RangeXPCost;

export type FixedXPCost = {
	type: "fixed";
	name: string;
	value: number;
};

export type RangeXPCost = {
	type: "range";
	name: string;
	min: number;
	max: number;
};

export type DividerSubtype =
	| "faction"
	| "investigators"
	| "weakness"
	| "basic_weakness"
	| "bonded"
	| "customizations"
	| "upgrade";

export type DividerSubtypeItem = {
	type: DividerSubtype;
	icon: string;
	name: string;
};

export type DividerType =
	| "scenario"
	| "campaign"
	| "encounter"
	| "player"
	| "investigator";

export type ScenarioDividerData = {
	type: "scenario" | "campaign" | "encounter";
	storyCode: string;
	cardsCount?: number;
	cards?: EncounterSetTypeEntry[];
};

export type PlayerDividerData = {
	type: "player";
	faction: Faction;
	cardSlot?: CardSlot | null;
	subtype?: DividerSubtype | null;
	cardType?: CardType | null;
	xpCost?: XPCost | null;
	storyCode?: string;
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
	fontSizeScale?: number;
	customTitle?: string;
	icon?: string;
	customIcon?: string;
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
