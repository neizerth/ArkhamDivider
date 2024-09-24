import { AddStoryDividersOptions } from "@/store/features/addDividers/addDividers";
import { IDivider } from "@/types/dividers";
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
    icon
  } = story;

  return [
    {
      id: uniqId(),
      name,
      icon,
      type: 'campaign'
    }
  ]
}