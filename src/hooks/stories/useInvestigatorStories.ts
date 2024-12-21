import { selectStories } from "@/store/features/stories/stories"
import { useAppSelector } from "../useAppSelector"
import { selectArkhamesqueData } from "@/store/features/dividers/arkhamesque/arkhamesque";
import { selectLayout } from "@/store/features/layout/layout";
import { arkhamesqueCategory } from "@/data/layouts/arkhamesque";
import { hasArkhamesqueInvestigatorSupport } from "@/store/features/dividers/arkhamesque/criteria";
import { prop } from "ramda";
import { IStory } from "@/types/api";
import { selectLanguage } from "@/store/features/language/language";
import { useTranslation } from "react-i18next";

export const useInvestigatorStories = () => {
  const stories = useAppSelector(selectStories);
  const { t } = useTranslation();

  const arkhamesqueData = useAppSelector(selectArkhamesqueData);
  const { categoryId } = useAppSelector(selectLayout);
  const language = useAppSelector(selectLanguage);

  const isArkhamesqueLayout = categoryId !== arkhamesqueCategory.id;

  if (isArkhamesqueLayout || !arkhamesqueData) {
    return stories;
  }

  const getIsTranslated = ({ investigators }: IStory) => {
    if (language === 'en') {
      return true;
    }
    return investigators.every(
      ({ name }) => t(name) !== name
    );
  }

  const investigators = arkhamesqueData.investigators.map(
    category => category.data.map(prop('code'))
  ).flat();

  return stories.map(story => ({
    ...story,
    supported: hasArkhamesqueInvestigatorSupport({
      investigators,
      story
    }),
    tranlated: getIsTranslated(story)
  }));
}