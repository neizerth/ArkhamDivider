import { ascend, prop, sortWith, uniqBy } from 'ramda';
import { arrayIf } from '@/shared/lib/features/util/common';
import { AddStoryDividersOptions } from '@/shared/store/features/addDividers/addDividers';
import { IEncounterSet, IStory } from '@/shared/types/api';
import { IDivider } from '@/shared/types/dividers';
import { getCampaignDividers } from './getCampaignDividers';
import { getEncounterDividers } from './getEncounterDividers';
import { getScenarioDividers } from './getScenarioDividers';
import { getExtraStoryDividers } from './getExtraStoryDividers';

export type IGetStoryDividersOptions = AddStoryDividersOptions & {
  encounterSets: IEncounterSet[];
  returnStories?: IStory[];
  extraStory?: IStory;
};

export const getStoryDividers = (options: IGetStoryDividersOptions) => {
  const { returnStories = [], includeScenarios } = options;

  const scenarioDividers: IDivider[] = getScenarioDividers(options);

  const encounterDividers: IDivider[] = getEncounterDividers({
    ...options,
  });

  const returnSetDividers: IDivider[] = returnStories.flatMap((returnStory) =>
    getStoryDividers({
      ...options,
      story: returnStory,
      extraStory: options.story,
      returnStories: [],
    })
  );

  const campaignDividers: IDivider[] = getCampaignDividers(options);

  const extraDividers: IDivider[] = getExtraStoryDividers(options);

  const dividers = [
    ...campaignDividers,
    ...arrayIf(includeScenarios, scenarioDividers),
    ...encounterDividers,
    ...returnSetDividers,
    ...extraDividers,
  ];

  const uniqueDividers = uniqBy(({ type, name }) => `${type}_${name}`, dividers);

  return sortWith([ascend(prop('type'))], uniqueDividers);
};
