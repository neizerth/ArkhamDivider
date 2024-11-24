import { selectLayout, selectType } from "@/store/features/layout/layout";
import { useAppSelector } from "../useAppSelector";
import { selectArkhamesqueData } from "@/store/features/arkhamesque/arkhamesque";
import { arkhamesqueCategory } from "@/data/layouts/arkhamesque";
import { hasArkhamesqueInvestigatorSupport, hasArkhamesqueStorySupport } from "@/store/features/arkhamesque/criteria";
import { selectStory } from "@/store/features/dividers/dividers";
import { LayoutType } from "@/types/layouts";
import { prop } from "ramda";

export const useLayoutSupport = () => {
  
  const type = useAppSelector(selectType);
  const story = useAppSelector(selectStory);
  const arkhamesqueData = useAppSelector(selectArkhamesqueData);
  const { categoryId } = useAppSelector(selectLayout);

  if (type === LayoutType.PLAYER) {
    return true;
  }

  const isArkhamesqueLayout = categoryId === arkhamesqueCategory.id;

  if (!story) {
    return false;
  }

  if (!isArkhamesqueLayout) {
    return true;
  }

  if (!arkhamesqueData) {
    return false;
  }

  if (type === LayoutType.SCENARIO) {
    return hasArkhamesqueStorySupport({
      data: arkhamesqueData,
      story
    })
  }

  if (type === LayoutType.INVESTIGATOR) {
    const investigators = arkhamesqueData.investigators.map(
      category => category.data.map(prop('code'))
    ).flat();
    
    return hasArkhamesqueInvestigatorSupport({
      investigators,
      story
    })
  }

  return false;
}