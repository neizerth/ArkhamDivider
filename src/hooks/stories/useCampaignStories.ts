import { selectStories } from "@/store/features/stories/stories";
import { useAppSelector } from "../useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { arkhamesqueCategory } from "@/data/layouts/arkhamesque-classic";
import { selectArkhamesqueData } from "@/store/features/arkhamesque/arkhamesque";
import { hasArkhamesqueStorySupport } from "@/store/features/arkhamesque/criteria";

export const useCampaignStories = () => {
  const stories = useAppSelector(selectStories);
  const arkhamesqueData = useAppSelector(selectArkhamesqueData);
  const { categoryId } = useAppSelector(selectLayout);

  const isArkhamesqueLayout = categoryId !== arkhamesqueCategory.id;
  
  if (isArkhamesqueLayout || !arkhamesqueData) {
    return stories;
  }

  return stories.map(story => ({
    ...story,
    supported: hasArkhamesqueStorySupport({
      story,
      data: arkhamesqueData
    })
  }));
}
