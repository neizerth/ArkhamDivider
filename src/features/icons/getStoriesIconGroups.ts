import { IStory } from "@/types/api";
import { IGetIconGroupsOptions } from "./getIconGroups";
import { isNotNil, propEq, uniq } from "ramda";
import { isCampaign, isChallenge, isSideCampaign, isSideContent } from '@/store/features/stories/criteria';

export const getStoriesIconGroups = ({
  stories,
  encounterSets
}: IGetIconGroupsOptions) => {

  const toIcon = (name: string) => encounterSets
    .find(
      propEq(name, 'code')
    )?.icon;

  const campaignGroups = stories.filter(story => isCampaign(story) || isSideCampaign(story));
  const sideGroups = stories.filter(isSideContent)
  const challengeGroups = stories.filter(isChallenge);

  const toIconGroup = getStoryIconGroup(toIcon);

  return [
    {
      id: 'campaigns',
      name: 'Campaigns',
      groups: campaignGroups.map(toIconGroup)
    },
    {
      id: 'side',
      name: 'Side Scenarios',
      groups: sideGroups.map(toIconGroup)
    },
    {
      id: 'challenges',
      name: 'Challenge Scenarios',
      groups: challengeGroups.map(toIconGroup)
    },
  ]
}


const getStoryIconGroup = (toIcon: (name: string) => string | undefined) => 
  ({ 
    encounter_sets, 
    name, 
    icon,
    code
  }: IStory) => {

    const icons = [
        icon,
        ...encounter_sets.map(toIcon)
      ]
      .filter(isNotNil);

    return {
      id: code,
      name,
      icons: uniq(icons)
    }
  }