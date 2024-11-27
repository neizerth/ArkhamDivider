import { IStory } from "@/types/api";
import { getStoryNS } from "@/util/i18n";
import { TOptions } from "i18next";
import { omit } from "ramda";
import { useTranslation } from "react-i18next";


const omitNS = omit(['ns']);

export const useStoryTranslation = (story?: IStory) => {
  const storyNs = story && getStoryNS(story.code);

  const i18n = useTranslation();

  const translate = (text: string, options: TOptions = {}) => {
    const translation = i18n.t(text, omitNS(options));

    if (translation && translation !== text) {
      return translation;
    }
    
    if (!options.ns) {
      return text;
    }
    
    return i18n.t(text, {
      ...options,
      ns: storyNs
    });
  }

  const translateStory = (text: string, story?: IStory) => 
    translate(text, {
      ns: story && getStoryNS(story.code)
    });

  return {
    ...i18n,
    t: translate,
    translateStory
  }
}