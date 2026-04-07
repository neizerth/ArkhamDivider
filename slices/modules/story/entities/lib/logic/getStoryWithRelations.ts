import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import type { Story } from "@/modules/story/shared/model";
import { mapStoryWithRelations } from "./mapStoryWithRelations";

type Options = {
	story?: Story;
	returnStory?: Story;
	encounterSets: EncounterSet[];
};

export const getStoryWithRelations = ({
	story,
	returnStory,
	encounterSets,
}: Options) => {
	if (!story) {
		return null;
	}

	const storyWithRelations = mapStoryWithRelations({ story, encounterSets });

	const returnStoryWithRelations =
		returnStory && mapStoryWithRelations({ story: returnStory, encounterSets });

	return mapStoryWithRelations({
		story: storyWithRelations,
		returnStory: returnStoryWithRelations,
		encounterSets,
	});
};
