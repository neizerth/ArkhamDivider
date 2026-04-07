import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import type { ArkhamesqueClassicDividerProps } from "../../../model";
import { findScenario, findStory, withBuildPrefix } from "./helpers";

type Options = {
	data: IArkhamesqueBuild;
	divider: ArkhamesqueClassicDividerProps;
};

export const getArkhamesqueClassicScenarioImage = ({
	data,
	divider,
}: Options): string[] | undefined => {
	if (divider.layoutType !== "scenario") {
		return;
	}

	const storyCode = divider.story?.return_to_code ?? divider.storyCode;
	const story = findStory(data, storyCode);
	if (!story) {
		return;
	}

	// For scenario dividers, try to match by scenario code; otherwise fall back to the story image.
	// Legacy logic matches build scenario code(s) against `scenario.id`.
	const scenarioCode =
		divider.type === "scenario" && "scenario" in divider
			? divider.scenario?.id
			: undefined;
	const scenario = findScenario(story, scenarioCode);

	const filename = scenario ? `${story.name}${scenario.name}` : story.name;

	return [withBuildPrefix(data, filename)];
};
