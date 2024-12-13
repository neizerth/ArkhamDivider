import { ArkhamDecoDividerType } from "@/data/layouts/arkham-deco";
import { DividerType, IDivider } from "@/types/dividers";

export const STORY_DIVIDERS = [DividerType.ENCOUNTER, DividerType.SCENARIO];


export const getDefaultSpecialIcon = ({
  divider,
  layoutType
}: {
  divider: IDivider,
  layoutType: ArkhamDecoDividerType
}) => {
  const {
    type,
    campaignIcon,
    specialIcon,
  } = divider;

  const isTab = layoutType === ArkhamDecoDividerType.TAB;
  const isPlayer = type === DividerType.PLAYER;

  if (isTab) {
    return;
  }

  if (isPlayer) {
    return;
  }
  return campaignIcon || specialIcon;
}

export const getDefaultLineIcon = ({
  divider,
  layoutType
}: {
  divider: IDivider,
  layoutType: ArkhamDecoDividerType
}) => {
  const {
    type,
    campaignIcon,
  } = divider;

  // if (type === DividerType.CAMPAIGN) {
  //   return;
  // }

  const isTab = layoutType === ArkhamDecoDividerType.TAB;
  const isPlayer = type === DividerType.PLAYER;

  if (!isTab) {
    if (isPlayer) {
      return campaignIcon;
    }
    return;
  }

  if (type === DividerType.CAMPAIGN) {
    return;
  }
  
  return campaignIcon;
}