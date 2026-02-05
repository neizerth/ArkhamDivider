import type { Faction } from "@/modules/faction/shared/model";
import type {
	CardSlot,
	DividerSubtype,
	PlayerCardType,
	XPCost,
} from "./divider";

export type GenerateDividersMode = "add" | "create";

export type ScenarioDividerParams = {
	campaignDivider: boolean;
	encounterDividers: boolean;
	scenarioDividers: boolean;
	scenarioEncounterDividers: boolean;
	campaignIcon: boolean;
	encounterSize: boolean;
	scenarioSize: boolean;
	extraEncounterSets: boolean;
	returnSet: boolean;
};

export type PlayerDividerParams = {
	factions: Faction[];
	cardTypes: PlayerCardType[];
	cardSlots: CardSlot[];
	subtypes: DividerSubtype[];
	numericXP: boolean;
	xpCosts: XPCost[];
};

export type InvestigatorDividerParams = {
	storyCodes: string[];
};
