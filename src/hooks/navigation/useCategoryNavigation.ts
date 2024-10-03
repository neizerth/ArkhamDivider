import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";
import { selectCategoryId, setCategoryId, setLayoutByCriteria } from "@/store/features/layout/layout";
import { layoutCategories } from "@/data/layouts";
import { prop } from "ramda";

export const useCategoryNavigation = () => {
  const { categoryId } = useParams();
  const currentCategoryId = useAppSelector(selectCategoryId);
  const dispatch = useAppDispatch();

  const categories = layoutCategories.map(prop('id'));

  useEffect(() => {
    if (categoryId === currentCategoryId) {
      return;
    }

    if (!categoryId) {
      dispatch(setCategoryId());
      return;
    }

    if (!categories.includes(categoryId)) {
      return;
    }

    dispatch(setCategoryId(categoryId));

  }, [categoryId]);
}