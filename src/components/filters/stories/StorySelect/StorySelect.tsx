import S from './StorySelect.module.scss';
import Select from 'react-select';

import { IStory } from '@/types/api';
import { isCampaign, isChallenge, isSideCampaign, isSideContent } from '@/store/features/stories/criteria';
import { StorySelectOption } from '../StorySelectOption/StorySelectOption';
import { StorySelectSingleValue } from '../StorySelectSingleValue/StorySelectSingleValue';
import { ascend, descend, prop, sortWith } from 'ramda';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import { useAppNavigate } from '@/hooks/useAppNavigate';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectStory } from '@/store/features/dividers/dividers';
import { useStoryTranslation } from '@/hooks/useStoryTranslation';


export type StorySelectProps = PropsWithClassName & {
  stories: IStory[]
  getIsTranslated: (story: IStory) => boolean
}

export const StorySelect = ({ 
  stories, 
  className,
  getIsTranslated,
}: StorySelectProps) => {
  const { t, translateStory } = useStoryTranslation();
  const navigate = useAppNavigate();
  const story = useAppSelector(selectStory);

  const data = sortWith([
    ascend(({ position }) => position || Infinity),
    descend(({ is_official }) => Boolean(is_official)),
    ascend(prop('name'))
  ], stories)

  const labels = data.reduce((target, story) => {
    const { name, code } = story;
    target.set(code, translateStory(name, story));
    return target;
  }, new Map);

  const mapStory = (story: IStory) => ({
    label: translateStory(story.name, story),
    isTranslated: getIsTranslated(story),
    value: story
  });

  const onChange = (story: IStory) => {
    navigate({
      storyId: story.code
    })
  }
  
  const getOptions = (filter: (story: IStory) => boolean) => {
    const stories = data.filter(filter);
    return stories.map(mapStory);
  }

  const campaigns = getOptions(story => isCampaign(story) || isSideCampaign(story))
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

  const value = story && mapStory(story);

  return (
    <Select
      isMulti={false}
      onChange={(item) => item && onChange(item.value)}
      className={classNames(S.select, className)}
      placeholder={t('Select Campaign')}
      options={groups}
      value={value}
      getOptionLabel={({ value }) => labels.get(value.code)}
      components={components}
    />
  );
}