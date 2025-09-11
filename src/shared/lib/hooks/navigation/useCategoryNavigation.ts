import { prop } from 'ramda';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { layoutCategories } from '@/shared/data/layouts';
import { arkhamesqueCategory } from '@/shared/data/layouts/arkhamesque';
import { loadArkhamesqueData } from '@/shared/store/features/dividers/arkhamesque/arkhamesque';
import { selectCategoryId, setCategoryId } from '@/shared/store/features/layout/layout';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

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
      dispatch(setCategoryId(null));
      return;
    }

    if (!categories.includes(categoryId)) {
      return;
    }
    dispatch(setCategoryId(categoryId));

    if (categoryId === arkhamesqueCategory.id) {
      dispatch(loadArkhamesqueData());
    }
  }, [categoryId, categories.includes, currentCategoryId, dispatch]);
};
