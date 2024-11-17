import { IStory } from "@/types/api";
import { getStoryNS } from "@/util/i18n";
import { useTranslation } from "react-i18next";

export const useStoryTranslation = (story?: IStory) => {
  const storyNs = story && getStoryNS(story);

  const i18n = useTranslation();

  const translate = (text: string, ns = storyNs) => {
    const translation = i18n.t(text);

    if (translation && translation !== text) {
      return translation;
    }
    
    if (!ns) {
      return text;
    }
    
    return i18n.t(text, {
      ns
    });
  }

  const translateStory = (text: string, story: IStory) => translate(text, getStoryNS(story));

  return {
    ...i18n,
    t: translate,
    translateStory
  }
}