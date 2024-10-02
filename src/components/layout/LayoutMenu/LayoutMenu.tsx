import { useTranslation } from 'react-i18next';
import S from './LayoutMenu.module.scss';
import { Container } from '@/components';
import { PropsWithChildren } from 'react';
import { LayoutType } from '@/types/layouts';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout, selectType, setLayout, setType } from '@/store/features/layout/layout';
import classNames from 'classnames';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setDividers } from '@/store/features/dividers/dividers';
import { getLayouts } from '@/util/layouts';


export type LayoutMenuItemProps = PropsWithChildren & {
  type: LayoutType
}

export const LayoutMenuItem = ({ type, children }: LayoutMenuItemProps) => {
  const currentType = useAppSelector(selectType);
  const {
    orientation,
    color,
    categoryId
  } = useAppSelector(selectLayout);

  const dispatch = useAppDispatch();
  const isSelected = currentType === type;

  const classList = classNames(S.item, isSelected && S.selected);

  const select = () => {
    if (type === currentType) {
      return;
    }
    
    dispatch(setType(type))
    dispatch(setDividers([]));

    const [layout] = getLayouts({
      orientation,
      color,
      type,
      categoryId
    });

    dispatch(setLayout(layout))
  };

  return (
    <div 
      className={classList}
      onClick={select}
    >
      {children}
    </div>
  )
}

export type LayoutMenuProps = {

}

export const LayoutMenu = ({}: LayoutMenuProps) => {
  const { t } = useTranslation();

  return (
    <div className={S.container}>
      <Container>
        <div className={S.menu}>
          <LayoutMenuItem type={LayoutType.SCENARIO}>{t('Campaigns')}</LayoutMenuItem>
          <LayoutMenuItem type={LayoutType.PLAYER}>{t('Player Cards')}</LayoutMenuItem>
          <LayoutMenuItem type={LayoutType.INVESTIGATOR}>{t('Investigators')}</LayoutMenuItem>
        </div>
      </Container>
    </div>
  );
}