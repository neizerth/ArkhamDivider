import type { EncounterSetGroup } from "@/modules/encounterSet/shared/model";
import type { StoryScenario } from "../../shared/model";

export type ScenarioEncounterSetGroup = {
	id: string;
	mainScenario: StoryScenario;
	scenario: StoryScenario;
	group: EncounterSetGroup;
	showName: boolean;
	groupName: string;
};
