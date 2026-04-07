import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import type { DividerType } from "@/modules/divider/shared/model";
import type { Story } from "@/modules/story/shared/model";
import { isArkhamesqueClassicInvestigatorSupported as isInvestigatorStorySupported } from "./isArkhamesqueClassicInvestigatorSupported";
import { isArkhamesqueClassicScenarioStorySupported as isScenarioSupported } from "./isArkhamesqueClassicScenarioStorySupported";

type Options = {
	story: Story;
	data: IArkhamesqueBuild;
	dividerType: DividerType;
};

export const isArkhamesqueClassicStorySupported = ({
	story,
	data,
	dividerType,
}: Options) => {
	if (!story) {
		return false;
	}
	if (dividerType === "scenario") {
		return isScenarioSupported({ story, data });
	}
	if (dividerType === "investigator") {
		return isInvestigatorStorySupported({ story, data });
	}
	return true;
};
