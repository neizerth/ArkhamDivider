import { uniq } from "ramda";
import type { StoryScenario } from "@/modules/story/shared/model";
import type { EncounterSet, EncounterSetGroup } from "../../model";

export type EncounterIconInfo = {
	icon: string;
	encounter_set_code?: string;
};

type Options = {
	scenario: StoryScenario;
	mainScenario?: StoryScenario;
	encounterSets: EncounterSet[];
	icons?: EncounterIconInfo[];
};

type MappedStep = {
	id: string;
	is_default: boolean;
	version_number: number;
	version_text: string;
	encounter_sets: string[];
};

export const getEncounterSetGroups = (options: Options) => {
	const steps = getAllGroups(options);

	if (steps.length === 0) {
		return getScenarioGroups(options);
	}

	return toVersionGroups(steps);
};

const getScenarioGroups = (options: Options): EncounterSetGroup[] => {
	const {
		id,
		encounter_sets = [],
		extra_encounter_sets = [],
	} = options.scenario;
	const toEncounters = createCodeMapper(options);

	return [
		{
			id,
			main: toEncounters(encounter_sets),
			side: toEncounters(extra_encounter_sets),
			version_number: 1,
			version_text: "I",
		},
	];
};

const getAllGroups = (options: Options): MappedStep[] => {
	const { id, encounter_set_groups = [] } = options.scenario;
	const toEncounters = createCodeMapper(options);
	const excludeIds = [id, options.mainScenario?.id].filter(
		(value): value is string => Boolean(value),
	);

	return encounter_set_groups.map((group) => ({
		...group,
		encounter_sets: toEncounters(
			group.encounter_sets.filter((code) => !excludeIds.includes(code)),
		),
	}));
};

const toVersionGroups = (steps: MappedStep[]): EncounterSetGroup[] => {
	const groups: EncounterSetGroup[] = [];

	for (const step of steps) {
		const last = groups.at(-1);

		if (step.is_default || !last) {
			groups.push({
				id: `${step.id}_${step.version_text}_${step.version_number}`,
				main: step.is_default ? [...step.encounter_sets] : [],
				side: step.is_default ? [] : [...step.encounter_sets],
				version_number: step.version_number,
				version_text: step.version_text,
			});
			continue;
		}

		last.side.push(...step.encounter_sets);
	}

	return groups.map((group) => {
		const main = uniq(group.main);
		return {
			...group,
			main,
			side: uniq(group.side.filter((icon) => !main.includes(icon))),
		};
	});
};

const createCodeMapper = ({
	scenario,
	mainScenario = scenario,
	encounterSets,
	icons = [],
}: Options) => {
	const excludeIcons = [scenario.icon, mainScenario.icon];

	return (codes: string[]) =>
		codes
			.map((code) => toIcon(code, encounterSets, icons))
			.filter(
				(icon): icon is string => Boolean(icon) && !excludeIcons.includes(icon),
			);
};

const toIcon = (
	code: string,
	encounterSets: EncounterSet[],
	icons: EncounterIconInfo[],
) =>
	icons.find((icon) => icon.encounter_set_code === code)?.icon ??
	encounterSets.find((set) => set.code === code)?.icon;
