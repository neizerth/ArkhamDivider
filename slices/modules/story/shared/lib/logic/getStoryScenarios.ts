import { compact } from "ramda-adjunct";
import type { StoryScenario } from "../../model";

export const getStoryScenarios = <T extends StoryScenario>({
	scenario,
	scenarios = [],
}: {
	scenario?: T;
	scenarios?: T[];
}) => {
	return compact([scenario, ...scenarios]);
};
