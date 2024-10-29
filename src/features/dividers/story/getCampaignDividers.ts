import { AddStoryDividersOptions } from "@/store/features/addDividers/addDividers";
import { DividerType, IDivider } from "@/types/dividers";
import { uniqId } from "@/util/common";

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
      .filter(campaign => campaign.name !== name)
      .map(campaign => ({
        id: uniqId(),
        name: campaign.name,
        icon: campaign.icon,
        campaignIcon: icon,
        type: DividerType.CAMPAIGN,
        story
      }))
  ]
}