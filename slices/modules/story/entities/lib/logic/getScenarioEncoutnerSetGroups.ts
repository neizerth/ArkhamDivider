import {
	type EncounterIconInfo,
	getEncounterSetGroups,
} from "@/modules/encounterSet/shared/lib/logic";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import { groupScenariosBySameEncounters } from "@/modules/story/shared/lib";
import type { StoryScenario } from "../../../shared/model";
import type { ScenarioEncounterSetGroup } from "../../model";

type Options = {
	scenario: StoryScenario;
	encounterSets: EncounterSet[];
	icons?: EncounterIconInfo[];
};

export const getScenarioEncounterSetGroups = ({
	scenario,
	encounterSets,
	icons,
}: Options): ScenarioEncounterSetGroup[] => {
	const { scenarios } = scenario;

	if (!scenarios) {
		return getSingleGroups({
			scenario,
			encounterSets,
			icons,
		});
	}

	return getMultiGroups({
		mainScenario: scenario,
		scenarios,
		encounterSets,
		icons,
	});
};

const getSingleGroups = ({
	scenario,
	encounterSets,
	icons,
}: Options): ScenarioEncounterSetGroup[] => {
	const visibleGroups = toVisibleGroups({
		scenario,
		encounterSets,
		icons,
	});
	const showName = visibleGroups.length > 1;

	return visibleGroups.map((group) => {
		const versionNumber = group.version_number.toString();
		const groupName = scenario.part_text ?? versionNumber;

		return {
			id: `${scenario.id}-${group.id}`,
			mainScenario: scenario,
			scenario,
			group,
			showName,
			groupName,
		};
	});
};

const getMultiGroups = ({
	mainScenario,
	scenarios,
	encounterSets,
	icons,
}: {
	mainScenario: StoryScenario;
	scenarios: StoryScenario[];
	encounterSets: EncounterSet[];
	icons?: EncounterIconInfo[];
}): ScenarioEncounterSetGroup[] => {
	const scenarioGroups = groupScenariosBySameEncounters(scenarios);
	const showNameFromScenarioGroup = scenarioGroups.length > 1;

	return scenarioGroups.flatMap((groupedScenarios) => {
		const groupedScenario = groupedScenarios[0];
		const visibleGroups = toVisibleGroups({
			mainScenario,
			scenario: groupedScenario,
			encounterSets,
			icons,
		});
		const showName = showNameFromScenarioGroup || visibleGroups.length > 1;

		return visibleGroups.map((group) => {
			const versionNumber = group.version_number.toString();
			const groupName = groupedScenario.part_text ?? versionNumber;

			return {
				id: `${groupedScenario.id}-${group.id}`,
				mainScenario,
				scenario: groupedScenario,
				group,
				showName,
				groupName,
			};
		});
	});
};

const toVisibleGroups = ({
	scenario,
	mainScenario = scenario,
	encounterSets,
	icons,
}: {
	scenario: StoryScenario;
	mainScenario?: StoryScenario;
	encounterSets: EncounterSet[];
	icons?: EncounterIconInfo[];
}): ReturnType<typeof getEncounterSetGroups> => {
	return getEncounterSetGroups({
		mainScenario,
		scenario,
		encounterSets,
		icons,
	}).filter(({ main, side }) => {
		return main.length > 0 || side.length > 0;
	});
};
