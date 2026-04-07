import type { Icon } from "@/modules/core/icon/shared/model";
import type { EncounterSetTypeEntry } from "@/modules/encounterSet/shared/model";
import type { Faction } from "@/modules/faction/shared/model";
import type {
	Story,
	StoryScenarioWithRelations,
	StoryWithRelations,
} from "@/modules/story/shared/model";
import type { Side, Single } from "@/shared/model";

export type Investigator = Single<Story["investigators"]>;

export type PlayerCardType = "asset" | "event" | "skill";

export type CardSlot =
	| "hand"
	| "hand_x2"
	| "arcane"
	| "arcane_x2"
	| "accessory"
	| "body"
	| "ally"
	| "head"
	| "tarot";

export type XPCost = FixedXPCost | RangeXPCost;

export type XPRangeStatus = "active" | "range" | "inactive";

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
	| "customizations";
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

export type ScenarioDividerData = (
	| {
			type: "campaign" | "encounter";
	  }
	| {
			type: "scenario";
			scenario: StoryScenarioWithRelations;
	  }
) & {
	layoutType: "scenario";
	storyCode: string;
	cardsCount?: number;
	cards?: EncounterSetTypeEntry[];
};

export type PlayerDividerData = {
	type: "player";
	layoutType: "player";
	faction: Faction;
	cardSlot?: CardSlot | null;
	subtype?: DividerSubtype | null;
	cardType?: PlayerCardType | null;
	xpCost?: XPCost | null;
	storyCode?: string | null;
};

export type InvestigatorDividerData = {
	type: "investigator";
	layoutType: "investigator";
	faction: Faction;
	storyCode: string;
	investigator: Investigator;
};

export type BaseDividerData<Params = void> = {
	id: string;
	side: Side;
	title: string;
	fontSizeScale?: number;
	customTitle?: string;
	icon?: Icon | null;
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
