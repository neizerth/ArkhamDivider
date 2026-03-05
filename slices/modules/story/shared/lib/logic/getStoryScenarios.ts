import { compact } from "ramda-adjunct";
import type { StoryScenario } from "../../model";

export const getStoryScenarios = <T extends StoryScenario>({
	scenario,
	scenarios = [],
	code,
}: {
	scenario?: T;
	scenarios?: T[];
	code: string;
}) => {
	return compact([scenario, ...scenarios]).map((scenario) => ({
		...scenario,
		storyCode: code,
	}));
};
