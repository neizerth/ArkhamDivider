import { propEq } from "ramda";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import type { Story } from "@/modules/story/shared/model";
import { getStoryWithRelations } from "./getStoryWithRelations";

type Options = {
	code?: string;
	stories: Story[];
	encounterSets: EncounterSet[];
};

export const createStoryWithRelations = ({
	stories,
	code,
	encounterSets,
}: Options) => {
	if (!code) {
		return;
	}
	const story = stories.find(propEq(code, "code"));
	if (!story) {
		return;
	}
	const returnStory = stories.find(propEq(story.return_to_code, "code"));

	const returnStoryWithRelations =
		returnStory && getStoryWithRelations({ story: returnStory, encounterSets });

	return getStoryWithRelations({
		story,
		returnStory: returnStoryWithRelations,
		encounterSets,
	});
};
