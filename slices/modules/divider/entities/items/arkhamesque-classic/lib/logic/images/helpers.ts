import type {
	IArkhamesqueBuild,
	IArkhamesqueInvestigator,
	IArkhamesqueStory,
	IArkhamesqueStoryScenario,
} from "arkhamesque-classic-divider-data";

export const withBuildPrefix = (data: IArkhamesqueBuild, name: string) =>
	`${data.prefix ?? ""}${name}`;

export const getScenarioCodes = (
	scenario: IArkhamesqueStoryScenario,
): string[] => {
	if ("code" in scenario) {
		return [scenario.code];
	}
	return scenario.codes;
};

export const findScenario = (
	story: IArkhamesqueStory,
	code: string | undefined,
) => {
	if (!code || !story.scenarios) {
		return;
	}
	return story.scenarios.find((s) => getScenarioCodes(s).includes(code));
};

export const findStory = (
	data: IArkhamesqueBuild,
	code: string | undefined,
) => {
	if (!code) {
		return;
	}
	for (const category of data.stories) {
		const match = category.data.find((s) => s.code === code);
		if (match) {
			return match;
		}
	}
};

export const findInvestigator = (
	data: IArkhamesqueBuild,
	code: string | undefined,
):
	| { categoryPrefix?: string; investigator: IArkhamesqueInvestigator }
	| undefined => {
	if (!code) {
		return;
	}
	for (const category of data.investigators) {
		const match = category.data.find((inv) => inv.code === code);
		if (match) {
			return { categoryPrefix: category.prefix, investigator: match };
		}
	}
};
