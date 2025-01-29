import { getScenarioEncounters } from "@/shared/lib/features/scenario";
import type { IScenario } from "@/shared/model/types/api";
import { groupWith } from "ramda";

export const getScenarioGroups = (scenarios: IScenario[]) => {
	return groupWith(hasSameEncounters, scenarios);
};

export const hasSameEncounters = (s1: IScenario, s2: IScenario): boolean => {
	const e1 = getScenarioEncounters(s1);
	const e2 = getScenarioEncounters(s2);

	return e1.length === e2.length && e1.every((code) => e2.includes(code));
};
