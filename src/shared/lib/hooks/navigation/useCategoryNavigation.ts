import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";
import { selectCategoryId, setCategoryId } from "@/app/store/features/layout/layout";
import { layoutCategories } from "@/shared/data/layouts";
import { prop } from "ramda";
import { arkhamesqueCategory } from "@/shared/data/layouts/arkhamesque";
import { loadArkhamesqueData } from "@/app/store/features/dividers/arkhamesque/arkhamesque";

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

    if (categoryId === arkhamesqueCategory.id) {
      dispatch(loadArkhamesqueData());
    }

  }, [categoryId]);
}