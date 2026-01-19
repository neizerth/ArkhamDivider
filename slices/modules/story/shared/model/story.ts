import type { ArkhamDivider } from "arkham-divider-data";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import type { Defined, Single } from "@/shared/model";

export type Story = Single<ArkhamDivider.Core["stories"]> & {
	translated: boolean;
};

export type StoryScenario = Defined<Story["scenario"]>;

export type StoryWithRelations = Omit<Story, "scenario" | "scenarios"> & {
	encounterSets: EncounterSet[];
	scenario?: StoryScenarioWithRelations;
	scenarios?: StoryScenarioWithRelations[];
};

export type StoryScenarioWithRelations = StoryScenario & {
	encounterSets: EncounterSet[];
	encounterSet?: EncounterSet;
};
