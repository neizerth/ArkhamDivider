import { IEncounterSet, IIcon, IStory } from '@/shared/types/api';
import { IIconMainGroup } from '@/shared/types/icons';
import { getGameIconGroups } from './getGameIconGroups';
import { getStoriesIconGroups } from './getStoriesIconGroups';

export type IGetIconGroupsOptions = {
  icons: IIcon[];
  encounterSets: IEncounterSet[];
  stories: IStory[];
};

export const getIconGroups = (options: IGetIconGroupsOptions): IIconMainGroup[] => {
  return [...getGameIconGroups(options), ...getStoriesIconGroups(options)];
};
