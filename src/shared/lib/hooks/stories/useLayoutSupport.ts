import { selectCategoryId, selectLayout, selectType } from "@/app/store/features/layout/layout";
import { useAppSelector } from "../useAppSelector";
import { selectArkhamesqueData } from "@/app/store/features/dividers/arkhamesque/arkhamesque";
import { arkhamesqueCategory } from "@/shared/data/layouts/arkhamesque";
import { hasArkhamesqueInvestigatorSupport, hasArkhamesqueStorySupport } from "@/app/store/features/dividers/arkhamesque/criteria";
import { selectStory } from "@/app/store/features/dividers/dividers";
import { LayoutType } from "@/shared/types/layouts";
import { prop } from "ramda";

export const useLayoutSupport = () => {
  
  const type = useAppSelector(selectType);
  const story = useAppSelector(selectStory);
  const arkhamesqueData = useAppSelector(selectArkhamesqueData);
  const layout = useAppSelector(selectLayout);
  const defaultCategoryId = useAppSelector(selectCategoryId);
  const categoryId = defaultCategoryId || layout.categoryId;

  if (type === LayoutType.PLAYER) {
    return true;
  }

  const isArkhamesqueLayout = categoryId === arkhamesqueCategory.id;

  if (!story) {
    return true;
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