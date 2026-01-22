import { isNotEmpty } from "ramda";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import { createStoryWithRelations } from "@/modules/story/entities/lib";
import type { Story } from "@/modules/story/shared/model";
import type { Divider, DividerWithRelations } from "../../../shared/model";

type Options = {
	dividers: Divider[];
	stories: Story[];
	encounterSets: EncounterSet[];
};

export const getDividersWithRelations = ({
	dividers,
	stories,
	encounterSets,
}: Options) => {
	return dividers
		.map((divider) => {
			const story = createStoryWithRelations({
				stories,
				code: divider.storyCode,
				encounterSets,
			});

			if (divider.type !== "player" && !story) {
				return null;
			}

			return {
				...divider,
				story,
			} as DividerWithRelations;
		})
		.filter(isNotEmpty);
};
