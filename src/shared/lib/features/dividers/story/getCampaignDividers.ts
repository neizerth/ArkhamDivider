import { AddStoryDividersOptions } from "@/app/store/features/addDividers/addDividers";
import { DividerType, IDivider } from "@/shared/types/dividers";
import { uniqId } from "@/shared/lib/features/util/common";

export const getCampaignDividers = ({
  story,
  includeCampaign
}: AddStoryDividersOptions): IDivider[] => {
  if (!includeCampaign) {
    return [];
  }

  const {
    name,
    icon,
    campaigns = []
  } = story;
  
  return [
    {
      id: uniqId(),
      story,
      name,
      icon,
      campaignIcon: icon,
      type: DividerType.CAMPAIGN
    },
    ...campaigns
      .filter(campaign => campaign.icon && campaign.name !== name)
      .map(campaign => ({
        id: uniqId(),
        campaign,
        name: campaign.name,
        icon: campaign.icon,
        campaignIcon: icon,
        type: DividerType.CAMPAIGN,
        story
      }))
  ]
}