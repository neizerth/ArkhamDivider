import { prop, uniqBy } from "ramda";
import { compact } from "ramda-adjunct";
import type { EncounterSetTypeEntry } from "@/modules/encounterSet/shared/model";
import type { StoryWithRelations } from "@/modules/story/shared/model";

/**
 * Campaign size must count unique physical cards.
 * ArkhamDividerData merges related encounter cards into multiple sets, so summing
 * `size` double-counts (e.g. Dunwich 396 vs official 307).
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

	const seen = new Set<number>();
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

			if (!cards) {
				entry.size += size;
				byType.set(type, entry);
				continue;
			}

			const numbers = Object.keys(cards);
			if (numbers.length === 0) {
				entry.size += size;
				byType.set(type, entry);
				continue;
			}

			for (const number of numbers) {
				const id = Number(number);
				if (seen.has(id)) {
					continue;
				}

				seen.add(id);
				entry.size += cards[id];
				entry.cards[id] = cards[id];
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
