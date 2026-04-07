import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { propEq } from "ramda";
import type { Story } from "@/modules/story/shared/model";

type Options = {
	story: Story;
	data: IArkhamesqueBuild;
};

export const isArkhamesqueClassicScenarioStorySupported = ({
	story,
	data,
}: Options) => {
	const id = story.return_to_code || story.code;
	return data.stories.some((category) =>
		category.data.some(propEq(id, "code")),
	);
};
