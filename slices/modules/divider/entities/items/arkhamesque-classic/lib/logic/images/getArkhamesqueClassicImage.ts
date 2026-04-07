import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { ArkhamesqueClassicAPI } from "../../../api/ArkhamesqueClassicAPI";
import type { ArkhamesqueClassicDividerProps } from "../../../model";
import { getArkhamesqueClassicInvestigatorImage } from "./getArkhamesqueClassicInvestigatorImage";
import { getArkhamesqueClassicPlayerImage } from "./getArkhamesqueClassicPlayerImage";
import { getArkhamesqueClassicScenarioImage } from "./getArkhamesqueClassicScenarioImage";

type Options = {
	data: IArkhamesqueBuild | null;
	divider: ArkhamesqueClassicDividerProps;
};

const callbackMap = {
	scenario: getArkhamesqueClassicScenarioImage,
	investigator: getArkhamesqueClassicInvestigatorImage,
	player: getArkhamesqueClassicPlayerImage,
};

export const getArkhamesqueClassicImage = ({ divider, data }: Options) => {
	if (!data) {
		return;
	}
	const getSegments = callbackMap[divider.layoutType];
	const segments = getSegments({ data, divider });

	if (!segments) {
		return;
	}

	return ArkhamesqueClassicAPI.getImageUrl(segments);
};
