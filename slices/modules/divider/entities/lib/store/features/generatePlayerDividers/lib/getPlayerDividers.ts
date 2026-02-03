import { v4 } from "uuid";
import type {
	Divider,
	PlayerDividerParams,
} from "@/modules/divider/shared/model";
import { cardSlotNames } from "@/modules/faction/shared/config";
import { getDividerSubtypeData } from "./getDividerSubtype";

export const getPlayerDividers = ({
	factions,
	subtypes,
	cardSlots,
	...options
}: PlayerDividerParams) => {
	const xpCosts = options.xpCosts.length === 0 ? [null] : options.xpCosts;

	const dividers: Divider[] = [];

	for (const faction of factions) {
		for (const subtype of subtypes) {
			const params = getDividerSubtypeData({
				subtype,
				faction,
			});

			dividers.push({
				id: v4(),
				type: "player",
				side: "front",
				faction,
				...params,
			});
		}
		for (const xpCost of xpCosts) {
			for (const cardSlot of cardSlots) {
				const title = cardSlotNames[cardSlot];
				const icon = `${cardSlot}_inverted`;
				dividers.push({
					id: v4(),
					type: "player",
					side: "front",
					faction,
					title,
					icon,
					customIcon: icon,
					xpCost,
				});
			}
		}
	}
	return dividers;
};
