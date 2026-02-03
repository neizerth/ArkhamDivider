import { v4 } from "uuid";
import { cardSlotNames, cardTypeItems } from "@/modules/divider/shared/config";
import type {
	Divider,
	PlayerDividerParams,
} from "@/modules/divider/shared/model";
import { nullableCollection } from "@/shared/util";
import { getDividerSubtypeData } from "./getDividerSubtype";

export const getPlayerDividers = ({
	factions,
	subtypes,
	cardSlots,
	cardTypes,
	...options
}: PlayerDividerParams) => {
	const xpCosts = nullableCollection(options.xpCosts);

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
			for (const cardType of cardTypes) {
				const item = cardTypeItems[cardType];
				dividers.push({
					id: v4(),
					type: "player",
					side: "front",
					...item,
					faction,
					cardType,
				});
			}
		}
	}
	return dividers;
};
