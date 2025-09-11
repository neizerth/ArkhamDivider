import { TOptions } from 'i18next';
import { omit } from 'ramda';
import { useTranslation } from 'react-i18next';
import { getStoryNS } from '@/shared/lib/features/util/i18n';
import { IStory } from '@/shared/types/api';

const omitNS = omit(['ns']);

export type UseStoryTranslateFunction = (text: string, options?: TOptions) => string;

export const useStoryTranslation = (story?: IStory) => {
  const storyNs = story && getStoryNS(story.code);

  const i18n = useTranslation();

  const translate: UseStoryTranslateFunction = (text: string, options: TOptions = {}) => {
    const translation = i18n.t(text, omitNS(options));
    const { ns = storyNs } = options;

    if (translation && translation !== text) {
      return translation;
    }

    if (!ns) {
      return text;
    }

    return i18n.t(text, {
      ...options,
      ns,
    });
  };

  const translateStory = (text: string, story?: IStory) =>
    translate(text, {
      ns: story && getStoryNS(story.code),
    });

  return {
    ...i18n,
    t: translate,
    translateStory,
  };
};
