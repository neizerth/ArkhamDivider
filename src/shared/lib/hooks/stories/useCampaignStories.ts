import { selectArkhamesqueData } from '@/shared/store/features/dividers/arkhamesque/arkhamesque';
import { hasArkhamesqueStorySupport } from '@/shared/store/features/dividers/arkhamesque/criteria';
import { selectLanguage, selectTranslatedStories } from '@/shared/store/features/language/language';
import { selectIsArkhamesqueLayout } from '@/shared/store/features/layout/layout';
import { selectStories } from '@/shared/store/features/stories/stories';
import { IStory } from '@/shared/types/api';
import { useAppSelector } from '../useAppSelector';

export const useCampaignStories = () => {
  const stories = useAppSelector(selectStories);
  const arkhamesqueData = useAppSelector(selectArkhamesqueData);

  const language = useAppSelector(selectLanguage);
  const translated = useAppSelector(selectTranslatedStories);

  const isArkhamesqueLayout = useAppSelector(selectIsArkhamesqueLayout);

  const getIsTranslated = (story: IStory) => {
    if (language === 'en') {
      return true;
    }
    if (!translated[language]) {
      return false;
    }
    return translated[language].includes(story.code);
  };

  if (!isArkhamesqueLayout || !arkhamesqueData) {
    return stories.map((story) => ({
      ...story,
      translated: getIsTranslated(story),
    }));
  }

  return stories.map((story) => ({
    ...story,
    supported: hasArkhamesqueStorySupport({
      story,
      data: arkhamesqueData,
    }),
    translated: getIsTranslated(story),
  }));
};
