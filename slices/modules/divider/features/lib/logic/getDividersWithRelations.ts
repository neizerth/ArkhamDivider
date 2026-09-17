import { isNotNil } from "ramda";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import { createStoryWithRelations } from "@/modules/story/entities/lib";
import type { Story } from "@/modules/story/shared/model";
import type { Divider, DividerWithRelations } from "../../../shared/model";

type Options = {
	dividers: Divider[];
	stories: Story[];
	encounterSets: EncounterSet[];
};

type CacheEntry = {
	divider: Divider;
	result: DividerWithRelations;
};

/**
 * Keep a stable `DividerWithRelations` reference when the underlying divider entity
 * has not changed. `setDividerParam` updates one entity; without this cache every
 * divider would get a fresh `{...divider, story}` object and defeat `memo` on
 * `DividerView` / print pages.
 */
let cachedStories: Story[] | null = null;
let cachedEncounterSets: EncounterSet[] | null = null;
const relationCache = new Map<string, CacheEntry>();

export const getDividersWithRelations = ({
	dividers,
	stories,
	encounterSets,
}: Options): DividerWithRelations[] => {
	if (stories !== cachedStories || encounterSets !== cachedEncounterSets) {
		relationCache.clear();
		cachedStories = stories;
		cachedEncounterSets = encounterSets;
	}

	const nextIds = new Set<string>();

	const result = dividers
		.map((divider) => {
			nextIds.add(divider.id);

			const prev = relationCache.get(divider.id);
			if (prev?.divider === divider) {
				return prev.result;
			}

			const story = createStoryWithRelations({
				stories,
				code: divider.storyCode,
				encounterSets,
			});

			if (divider.type !== "player" && !story) {
				relationCache.delete(divider.id);
				return null;
			}

			const withRelations = {
				...divider,
				story,
			} as DividerWithRelations;

			relationCache.set(divider.id, {
				divider,
				result: withRelations,
			});

			return withRelations;
		})
		.filter(isNotNil);

	for (const id of relationCache.keys()) {
		if (!nextIds.has(id)) {
			relationCache.delete(id);
		}
	}

	return result;
};
