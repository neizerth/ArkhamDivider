import { IStory } from "@/types/api";
import { getStoryNS } from "@/util/i18n";
import { TOptions } from "i18next";
import { useTranslation } from "react-i18next";

export const useStoryTranslation = (story?: IStory) => {
  const storyNs = story && getStoryNS(story);

  const i18n = useTranslation();

  const translate = (text: string, options: TOptions = { ns: storyNs }) => {
    const translation = i18n.t(text);

    if (translation && translation !== text) {
      return translation;
    }
    
    if (!options.ns) {
      return text;
    }
    
    return i18n.t(text, options);
  }

  const translateStory = (text: string, story: IStory) => translate(text, {
    ns: getStoryNS(story)
  });

  return {
    ...i18n,
    t: translate,
    translateStory
  }
}