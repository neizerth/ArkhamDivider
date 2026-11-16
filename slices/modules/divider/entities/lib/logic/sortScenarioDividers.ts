import { ascend, descend, sortWith } from "ramda";
import type {
	Divider,
	ScenarioDividerSortBy,
} from "@/modules/divider/shared/model";

const TYPE_ORDER: Record<string, number> = {
	campaign: 0,
	scenario: 1,
	encounter: 2,
};

export const sortScenarioDividers = (
	dividers: Divider[],
	sortBy: ScenarioDividerSortBy = "type",
): Divider[] => {
	switch (sortBy) {
		case "type":
			return sortWith(
				[
					ascend(getTypeOrd),
					ascend(getPositionOrd),
					ascend(getScenarioNumberOrd),
					ascend(getMinCardNumberOrd),
					ascend(getNameOrd),
				],
				dividers,
			);
		case "name":
			return sortWith(
				[
					ascend(getNameOrd),
					ascend(getTypeOrd),
					ascend(getPositionOrd),
					ascend(getMinCardNumberOrd),
				],
				dividers,
			);
		case "cardsCount":
			return sortWith(
				[
					ascend(getCardsCountOrd),
					ascend(getTypeOrd),
					ascend(getPositionOrd),
					ascend(getNameOrd),
				],
				dividers,
			);
		case "minCardNumber":
			return sortWith(
				[
					ascend(getPositionOrd),
					ascend(getMinCardNumberOrd),
					descend(getTypeOrd),
					ascend(getNameOrd),
				],
				dividers,
			);
		default:
			return dividers;
	}
};

const getTypeOrd = (divider: Divider) => {
	return TYPE_ORDER[divider.type] ?? Infinity;
};

const getPositionOrd = (divider: Divider) => {
	if (divider.layoutType !== "scenario" || divider.type === "campaign") {
		return Infinity;
	}
	return divider.storyPosition ?? Infinity;
};

const getScenarioNumberOrd = (divider: Divider) => {
	if (divider.type !== "scenario") {
		return Infinity;
	}
	return divider.scenario.number ?? Infinity;
};

const getMinCardNumberOrd = (divider: Divider) => {
	if (divider.layoutType !== "scenario" || divider.type === "campaign") {
		return Infinity;
	}
	return divider.minCardNumber ?? Infinity;
};

const getNameOrd = (divider: Divider) => divider.title;

const getCardsCountOrd = (divider: Divider) => divider.cardsCount ?? Infinity;
