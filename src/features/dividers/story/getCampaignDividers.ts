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
  } = story;

  return [
    {
      id: uniqId(),
      story,
      name,
      icon,
      type: DividerType.CAMPAIGN
    }
  ]
}