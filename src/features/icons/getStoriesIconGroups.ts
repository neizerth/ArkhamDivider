import { IStory } from "@/types/api";
import { IGetIconGroupsOptions } from "./getIconGroups";
import { isNotNil, propEq } from "ramda";
import { isCampaign, isChallenge, isSideContent } from '@/store/features/stories/criteria';

export const getStoriesIconGroups = ({
  stories,
  encounterSets
}: IGetIconGroupsOptions) => {

  const toIcon = (name: string) => encounterSets
    .find(
      propEq(name, 'code')
    )?.icon;

  const campaignGroups = stories.filter(isCampaign);
  const sideGroups = stories.filter(isSideContent)
  const challengeGroups = stories.filter(isChallenge);

  const toIconGroup = getStoryIconGroup(toIcon);

  return [
    {
      name: 'Campaigns',
      icons: campaignGroups.map(toIconGroup)
    },
    {
      name: 'Side Scenarios',
      icons: sideGroups.map(toIconGroup)
    },
    {
      name: 'Challenge Scenarios',
      icons: challengeGroups.map(toIconGroup)
    },
  ]
}


const getStoryIconGroup = (toIcon: (name: string) => string | undefined) => 
  ({ 
    encounter_sets, 
    name, 
    icon 
  }: IStory) => {

    const icons = [
        icon,
        ...encounter_sets.map(toIcon)
      ]
      .filter(isNotNil);

    return {
      name,
      icons
    }
  }