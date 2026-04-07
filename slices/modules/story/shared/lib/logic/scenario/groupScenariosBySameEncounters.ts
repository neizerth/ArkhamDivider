import { groupWith } from "ramda";
import type { StoryScenario } from "../../../model";
import { getScenarioEncounterSets } from "./getScenarioEncounterSets";

export const groupScenariosBySameEncounters = (scenarios: StoryScenario[]) => {
	return groupWith(hasSameEncounters, scenarios);
};

export const hasSameEncounters = (
	s1: StoryScenario,
	s2: StoryScenario,
): boolean => {
	const e1 = getScenarioEncounterSets(s1);
	const e2 = getScenarioEncounterSets(s2);

	return e1.length === e2.length && e1.every((code) => e2.includes(code));
};
