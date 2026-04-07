import { compact } from "ramda-adjunct";
import type { Divider } from "@/modules/divider/shared/model";
import type { GetEncounterSetDividersOptions } from "./getEncounterSetDividers";

export const getSpecialEncounterSetDividers = ({
	story,
}: GetEncounterSetDividersOptions) => {
	return compact([story.code === "tsk" && getConcealedCardsDivider()]);
};

const getConcealedCardsDivider = (): Divider => {
	return {
		id: "concealed_cards",
		side: "front",
		layoutType: "scenario",
		type: "encounter",
		title: "Concealed Cards",
		icon: "special_cards",
		cardsCount: 0,
		cards: [],
		storyCode: "tsk",
	};
};
