import { groupBy, isNotNil, prop, uniqBy } from "ramda";
import { getEncounterSetCards } from "@/modules/encounterSet/shared/lib/logic";
import type { EncounterSetTypeEntry } from "@/modules/encounterSet/shared/model";
import type { StoryWithRelations } from "@/modules/story/shared/model";

export const getCampaignCards = ({
	encounterSets,
	scenarioEncounterSets,
}: StoryWithRelations) => {
	const sets = uniqBy(prop("code"), [
		...encounterSets,
		...scenarioEncounterSets,
	]);

	const entries: EncounterSetTypeEntry[] = sets.flatMap((encounterSet) =>
		getEncounterSetCards({ encounterSet }),
	);

	const groups = groupBy(prop("type"), entries);

	const cards = Object.values(groups)
		.filter(isNotNil)
		.map((group) => ({
			type: group[0].type,
			size: group.reduce((acc, { size }) => acc + size, 0),
		}));

	return cards;
};
