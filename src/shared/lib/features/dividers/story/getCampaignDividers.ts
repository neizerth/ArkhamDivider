import { uniqId } from "@/shared/lib/features/util/common";
import type { AddStoryDividersOptions } from "@/shared/lib/store/features/addDividers/addDividers";
import { DividerType, type IDivider } from "@/shared/model/types/dividers";

export const getCampaignDividers = ({
	story,
	includeCampaign,
}: AddStoryDividersOptions): IDivider[] => {
	if (!includeCampaign) {
		return [];
	}

	const { name, icon, campaigns = [] } = story;

	return [
		{
			id: uniqId(),
			story,
			name,
			icon,
			campaignIcon: icon,
			type: DividerType.CAMPAIGN,
		},
		...campaigns
			.filter((campaign) => campaign.icon && campaign.name !== name)
			.map((campaign) => ({
				id: uniqId(),
				campaign,
				name: campaign.name,
				icon: campaign.icon,
				campaignIcon: icon,
				type: DividerType.CAMPAIGN,
				story,
			})),
	];
};
