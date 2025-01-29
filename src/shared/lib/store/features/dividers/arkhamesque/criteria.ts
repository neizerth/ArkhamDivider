import type { IStory } from "@/shared/model/types/api";
import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { propEq } from "ramda";

export const getArkhamesqueClassicStory = ({
	code,
	data,
}: {
	data: IArkhamesqueBuild;
	code: string;
}) => {
	for (const category of data.stories) {
		for (const story of category.data) {
			if (story.code === code) {
				return {
					category,
					story,
				};
			}
		}
	}
};

export type HasArkhamesqueSupportOptions = {
	story: IStory;
	data: IArkhamesqueBuild;
};

export const hasArkhamesqueStorySupport = ({
	story,
	data,
}: HasArkhamesqueSupportOptions) => {
	const id = story.return_to_code || story.code;
	return data.stories.some((category) =>
		category.data.some(propEq(id, "code")),
	);
};

export const hasArkhamesqueInvestigatorSupport = ({
	story,
	investigators,
}: {
	story: IStory;
	investigators: string[];
}) => {
	if (story.investigators.length === 0) {
		return false;
	}

	const supportedInvestigators = story.investigators.filter(
		({ code, alternate_of }) =>
			investigators.includes(code) ||
			(alternate_of && investigators.includes(alternate_of)),
	);

	return supportedInvestigators.length > 0;
};
