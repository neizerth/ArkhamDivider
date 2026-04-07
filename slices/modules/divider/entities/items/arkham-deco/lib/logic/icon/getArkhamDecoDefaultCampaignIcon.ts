import type { ArkhamDecoDividerProps } from "../../../model";

export const getArkhamDecoDefaultCampaignIcon = (
	props: ArkhamDecoDividerProps,
) => {
	return props.story?.icon;
};
