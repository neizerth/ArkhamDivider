import type {
	IArkhamesqueBuild,
	IArkhamesqueInvestigator,
	IArkhamesqueStory,
	IArkhamesqueStoryScenario,
} from "arkhamesque-classic-divider-data";

type DataCategory<T> = { prefix?: string; data?: T[] };

/** Some exports wrap adjacent categories in a nested array; flatten to a uniform list. */
export const flattenCategories = <T>(
	categories: Array<DataCategory<T> | DataCategory<T>[]> | undefined,
): DataCategory<T>[] => {
	if (!categories) {
		return [];
	}

	return categories.flatMap((category) =>
		Array.isArray(category) ? category : [category],
	);
};

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
	code?: string | null,
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
	const categories = flattenCategories(data.stories);
	for (const category of categories) {
		const match = category.data?.find((s) => s.code === code);
		if (match) {
			return { categoryPrefix: category.prefix, story: match };
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
	const categories = flattenCategories(data.investigators);
	for (const category of categories) {
		const match = category.data?.find((inv) => inv.code === code);
		if (match) {
			return { categoryPrefix: category.prefix, investigator: match };
		}
	}
};
