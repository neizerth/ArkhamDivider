import { IEncounterSet, IIcon, IStory } from "@/types/api"
import { getStoriesIconGroups } from "./getStoriesIconGroups";

export type IGetIconGroupsOptions = {
  icons: IIcon[]
  encounterSets: IEncounterSet[]
  stories: IStory[]
};

export const getIconGroups = (options: IGetIconGroupsOptions) => {
  return [
    ...getStoriesIconGroups(options)
  ]
}

