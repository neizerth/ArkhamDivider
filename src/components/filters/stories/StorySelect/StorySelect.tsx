import S from './StorySelect.module.scss';
import Select from 'react-select';

import { IStory } from '@/types/api';
import { isCampaign, isChallenge, isSideContent } from '@/store/features/stories/criteria';
import { useTranslation } from 'react-i18next';
import { StorySelectOption } from '../StorySelectOption/StorySelectOption';
import { StorySelectSingleValue } from '../StorySelectSingleValue/StorySelectSingleValue';
import { ascend, descend, prop, sortWith } from 'ramda';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';


export type StorySelectProps = PropsWithClassName & {
  stories: IStory[]
  value: IStory | null
  onChange: (story: IStory) => void
}

export const StorySelect = ({ 
  stories, 
  onChange,
  className,
  ...props 
}: StorySelectProps) => {
  const { t } = useTranslation();

  const data = sortWith([
    ascend(({ position }) => position || Infinity),
    descend(({ is_official }) => Boolean(is_official)),
    ascend(prop('name'))
  ], stories)

  const labels = data.reduce((target, { name, code }) => {
    target.set(code, name);
    return target;
  }, new Map);

  const mapStory = (story: IStory) => ({
    label: t(story.name),
    value: story
  });
  
  const getOptions = (filter: (story: IStory) => boolean) => 
    data
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

  const value = props.value && mapStory(props.value);

  return (
    <Select
      isMulti={false}
      onChange={(item) => item && onChange(item.value)}
      className={classNames(S.select, className)}
      options={groups}
      value={value}
      getOptionLabel={({ value }) => labels.get(value.code)}
      components={components}
    />
  );
}