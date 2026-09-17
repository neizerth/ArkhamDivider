import { prop, uniqBy } from "ramda";
import { getEncounterSetCards } from "@/modules/encounterSet/shared/lib/logic";
import type { EncounterSetTypeEntry } from "@/modules/encounterSet/shared/model";
import type { StoryWithRelations } from "@/modules/story/shared/model";

/**
 * Campaign size must count unique physical cards.
 * ArkhamDividerData merges related encounter cards into multiple sets, so summing
 * `size` double-counts (e.g. Dunwich 396 vs official 307).
 */
export const getCampaignCards = ({
	encounterSets,
	scenarioEncounterSets,
}: StoryWithRelations): EncounterSetTypeEntry[] => {
	const sets = uniqBy(prop("code"), [
		...encounterSets,
		...scenarioEncounterSets,
	]);

	const uniqueCards = new Map<number, { type: string; quantity: number }>();
	const fallbackByType = new Map<string, number>();

	for (const encounterSet of sets) {
		const types = getEncounterSetCards({ encounterSet });
		const hasCardMap = types.some(
			({ cards }) => cards && Object.keys(cards).length > 0,
		);

		if (!hasCardMap) {
			for (const { type, size } of types) {
				fallbackByType.set(type, (fallbackByType.get(type) ?? 0) + size);
			}
			continue;
		}

		for (const { type, cards } of types) {
			if (!cards) {
				continue;
			}

			for (const [number, quantity] of Object.entries(cards)) {
				const id = Number(number);

				if (!uniqueCards.has(id)) {
					uniqueCards.set(id, { type, quantity });
				}
			}
		}
	}

	const byType = new Map<
		string,
		{ size: number; cards: Record<number, number> }
	>();

	for (const [number, { type, quantity }] of uniqueCards) {
		const entry = byType.get(type) ?? { size: 0, cards: {} };
		entry.size += quantity;
		entry.cards[number] = quantity;
		byType.set(type, entry);
	}

	for (const [type, size] of fallbackByType) {
		const entry = byType.get(type) ?? { size: 0, cards: {} };
		entry.size += size;
		byType.set(type, entry);
	}

	return [...byType.entries()]
		.filter(([, { size }]) => size > 0)
		.map(([type, { size, cards }]) => ({
			type,
			size,
			...(Object.keys(cards).length > 0 ? { cards } : {}),
		}));
};
