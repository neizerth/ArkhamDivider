import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { isNotNil } from "ramda";
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
	const found = findStory(data, storyCode);
	if (!found) {
		return;
	}
	const { categoryPrefix, story } = found;

	// For scenario dividers, try to match by scenario code; otherwise fall back to the story image.
	// Legacy logic matches build scenario code(s) against `scenario.id`.
	const scenarioCode =
		divider.type === "scenario" && "scenario" in divider
			? divider.scenario?.id
			: undefined;
	const scenario = findScenario(story, scenarioCode);

	const parts = [
		categoryPrefix,
		story.name,
		scenario ? scenario.name : undefined,
	].filter(isNotNil);
	const filename = parts.join("");

	return [withBuildPrefix(data, filename)];
};
