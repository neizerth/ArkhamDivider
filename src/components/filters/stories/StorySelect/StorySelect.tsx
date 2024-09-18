import S from './StorySelect.module.scss';
import Select from 'react-select';

import { IStory } from '@/types/api';
import { isCampaign, isChallenge, isSideContent } from '@/store/features/stories/criteria';
import { useTranslation } from 'react-i18next';
import { StorySelectOption } from '../StorySelectOption/StorySelectOption';
import { StorySelectSingleValue } from '../StorySelectSingleValue/StorySelectSingleValue';


export type StorySelectProps = {
  stories: IStory[]
}

export const StorySelect = ({ stories }: StorySelectProps) => {
  const { t } = useTranslation();

  const labels = stories.reduce((target, { name, code }) => {
    target.set(code, name);
    return target;
  }, new Map);

  const mapStory = (story: IStory) => ({
    label: t(story.name),
    value: story
  });
  
  const getOptions = (filter: (story: IStory) => boolean) => 
    stories
      .filter(filter)
      .map(mapStory);

  const campaigns = getOptions(isCampaign)
  const sideContent = getOptions(isSideContent)
  const challenges = getOptions(isChallenge);

  const groups = [
    {
      label: t('Campaigns'),
      options: campaigns
    },
    {
      label: t('Side Scenarios'),
      options: sideContent
    },
    {
      label: t('Challenge Scenarios'),
      options: challenges
    }
  ]

  const components = { 
    Option: StorySelectOption,
    SingleValue: StorySelectSingleValue
  }

  return (
    <Select
      className={S.select}
      options={groups}
      getOptionLabel={({ value }) => labels.get(value.code)}
      components={components}
    />
  );
}