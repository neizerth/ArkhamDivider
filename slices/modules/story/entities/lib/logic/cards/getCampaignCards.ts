import { groupBy, isNotNil, prop } from "ramda";
import { getEncounterSetCards } from "@/modules/encounterSet/shared/lib/logic";
import type { EncounterSetTypeEntry } from "@/modules/encounterSet/shared/model";
import type { StoryWithRelations } from "@/modules/story/shared/model";

export const getCampaignCards = ({ encounterSets }: StoryWithRelations) => {
	const entries: EncounterSetTypeEntry[] = encounterSets.flatMap(
		(encounterSet) => getEncounterSetCards({ encounterSet }),
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
