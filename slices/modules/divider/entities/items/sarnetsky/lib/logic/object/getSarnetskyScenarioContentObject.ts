import type { DividerType } from "@/modules/divider/shared/model";
import type { SarnetskyDividerObjects } from "../../../model";

type Options = {
	type: DividerType;
	objects: SarnetskyDividerObjects;
};

export const getSarnetskyScenarioContentObject = ({
	type,
	objects: O,
}: Options) => {
	switch (type) {
		case "encounter":
		case "campaign":
			return {
				...O.scenarioContent,
				...O.scenarioContent[type],
			};
	}
	return O.scenarioContent;
};
