import type { Story, StoryScenario } from "@/modules/story/shared/model";

type Options = {
	story: Story;
	scenario: StoryScenario;
	space?: string;
	t: (key: string) => string;
};
export const getSarnetskyDefaultScenarioSubtitle = ({
	story,
	scenario,
	space = "\u{200B}",
	t,
}: Options) => {
	return `${t(story.name)}. ${space}${t(scenario.header)}`;
};
