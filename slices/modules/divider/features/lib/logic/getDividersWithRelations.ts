import { isNotEmpty } from "ramda";
import { getCategoryById, getLayoutById } from "@/modules/divider/entities/lib";
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
			const layout = getLayoutById(divider.layoutId);
			const category = getCategoryById(divider.categoryId);

			if (!layout || !category) {
				return null;
			}

			const base = {
				...divider,
				layout,
				category,
			};

			const story = createStoryWithRelations({
				stories,
				code: divider.storyCode,
				encounterSets,
			});

			if (divider.type !== "player" && !story) {
				return null;
			}

			return {
				...base,
				story,
			} as DividerWithRelations;
		})
		.filter(isNotEmpty);
};
