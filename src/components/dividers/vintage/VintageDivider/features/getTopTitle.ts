import { UseStoryTranslateFunction } from "@/shared/lib/hooks/useStoryTranslation";
import { DividerType, IDivider } from "@/shared/types/dividers";
import factions from "@/shared/data/factions.json";
import { propEq } from "ramda";

export const getPlayerTopTitle = ({ faction, name }: IDivider) => {
	if (faction) {
		return factions.find(propEq(faction, "id"))?.name;
	}

	return name;
};

export const getTopTitle = (options: {
	divider: IDivider;
	translate: UseStoryTranslateFunction;
}) => {
	const { divider, translate } = options;
	const { type, story, scenario, name } = divider;

	if (type === DividerType.PLAYER) {
		const title = getPlayerTopTitle(divider);
		return translate(title || "");
	}

	if (type === DividerType.CAMPAIGN && story) {
		return translate(story.name);
	}

	if (type === DividerType.SCENARIO && scenario) {
		const name = translate(scenario.scenario_name);
		const { number } = scenario;

		return number ? `${number}. ${name}` : name;
	}

	return name ? translate(name) : "";
};
