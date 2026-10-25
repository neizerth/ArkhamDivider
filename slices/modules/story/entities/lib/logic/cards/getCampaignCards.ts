import { prop, uniqBy } from "ramda";
import { compact } from "ramda-adjunct";
import type { EncounterSetTypeEntry } from "@/modules/encounterSet/shared/model";
import type { StoryWithRelations } from "@/modules/story/shared/model";

/**
 * Campaign size is the sum of encounter-set type `size` values (unique sets only).
 *
 * Do not dedupe by collector number across sets: numbers collide between packs
 * and alternate sets (Flood/Vortex, Doom of Arkham I/II) while Excel / Hobby /
 * arkham-divider-data `validation.size` all sum `size` as-is.
 *
 * `scenario_encounter_sets` often stores scenario ids, not encounter-set codes
 * (e.g. Carnevale → `carnevale_of_horrors` vs set code `venice`). Resolve those
 * via each scenario's main/related encounter sets as well.
 */
export const getCampaignCards = ({
	encounterSets,
	scenarioEncounterSets,
	scenarios,
}: StoryWithRelations): EncounterSetTypeEntry[] => {
	const sets = uniqBy(prop("code"), [
		...encounterSets,
		...scenarioEncounterSets,
		...scenarios.flatMap(({ encounterSet, encounterSets: scenarioSets }) =>
			compact([encounterSet, ...scenarioSets]),
		),
	]);

	const byType = new Map<
		string,
		{ size: number; cards: Record<number, number> }
	>();

	for (const { types = [] } of sets) {
		for (const { type, size, cards } of types) {
			if (size <= 0) {
				continue;
			}

			const entry = byType.get(type) ?? { size: 0, cards: {} };
			entry.size += size;

			if (cards) {
				for (const [number, qty] of Object.entries(cards)) {
					const id = Number(number);
					entry.cards[id] = (entry.cards[id] ?? 0) + qty;
				}
			}

			byType.set(type, entry);
		}
	}

	return [...byType.entries()]
		.filter(([, { size }]) => size > 0)
		.map(([type, { size, cards }]) => ({
			type,
			size,
			...(Object.keys(cards).length > 0 ? { cards } : {}),
		}));
};
