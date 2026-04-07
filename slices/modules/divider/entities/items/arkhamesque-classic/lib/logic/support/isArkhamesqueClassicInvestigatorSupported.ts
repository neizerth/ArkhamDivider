import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import type { Story } from "@/modules/story/shared/model";
import { getArkhamesqueClassicInvestigators } from "../getArkhamesqueClassicInvestigators";

type Options = {
	story: Story;
	data: IArkhamesqueBuild;
};
export const isArkhamesqueClassicInvestigatorSupported = ({
	story,
	data,
}: Options) => {
	if (story.investigators.length === 0) {
		return false;
	}

	const investigators = getArkhamesqueClassicInvestigators(data);

	const supportedInvestigators = story.investigators.filter(
		({ code, alternate_of }) =>
			investigators.includes(code) ||
			(alternate_of && investigators.includes(alternate_of)),
	);

	return supportedInvestigators.length > 0;
};
