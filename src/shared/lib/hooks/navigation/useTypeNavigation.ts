import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectType, setType } from '@/shared/store/features/layout/layout';
import { LayoutType } from '@/shared/types/layouts';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

export const useTypeNavigation = () => {
  const params = useParams();
  const type = params.type as LayoutType | undefined;
  const dispatch = useAppDispatch();
  const currentType = useAppSelector(selectType);

  useEffect(() => {
    if (!type) {
      return;
    }
    if (currentType === type) {
      return;
    }

    dispatch(setType(type));
  }, [type, currentType, dispatch]);
};
