import type { ArkhamDivider } from "arkham-divider-data";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import type { Defined, Single } from "@/shared/model";

export type Story = Single<ArkhamDivider.Core["stories"]> & {
	translated: boolean;
	return_code?: string;
	return_scenarios?: StoryScenario[];
	return_scenario_encounter_sets?: string[];
	return_encounter_sets?: string[];
};

export type StoryScenario = Defined<Story["scenario"]>;

export type StoryWithRelations = Omit<Story, "scenario" | "scenarios"> & {
	encounterSets: EncounterSet[];
	extraEncounterSets: EncounterSet[];
	scenarios: StoryScenarioWithRelations[];
	returnStory?: StoryWithRelations;
};

export type StoryScenarioWithRelations = StoryScenario & {
	extraEncounterSets: EncounterSet[];
	encounterSets: EncounterSet[];
	encounterSet?: EncounterSet;
};

export type StoryType = "campaign" | "standalone" | "challenge";
