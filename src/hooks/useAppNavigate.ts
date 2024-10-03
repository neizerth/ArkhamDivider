import { selectLanguage } from "@/store/features/language/language"
import { useAppSelector } from "./useAppSelector"
import { selectCategoryId, selectLayout, selectType } from "@/store/features/layout/layout";
import { useNavigate, useParams } from "react-router-dom";
import { createRoute, RouteOptions } from "@/util/routes";
import { selectStory } from "@/store/features/dividers/dividers";

export const useAppNavigate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const language = useAppSelector(selectLanguage);
  const type = useAppSelector(selectType);
  const categoryId = useAppSelector(selectCategoryId);
  const { id } = useAppSelector(selectLayout);
  const story = useAppSelector(selectStory); 

  return (options: RouteOptions) => {
    const route = createRoute({
      ...params,
      language,
      type,
      categoryId,
      layoutId: id,
      storyId: story?.code,
      ...options
    });
    navigate(route);
  };
} 