import { useTranslation } from 'react-i18next';
import S from './LayoutMenu.module.scss';
import { Container } from '@/components';
import { PropsWithChildren } from 'react';
import { LayoutType } from '@/types/layouts';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectType } from '@/store/features/layout/layout';
import classNames from 'classnames';
import { useAppNavigate } from '@/hooks/useAppNavigate';


export type LayoutMenuItemProps = PropsWithChildren & {
  type: LayoutType
}

export const LayoutMenuItem = ({ type, children }: LayoutMenuItemProps) => {
  const currentType = useAppSelector(selectType);
  const navigate = useAppNavigate();

  const isSelected = currentType === type;

  const classList = classNames(S.item, isSelected && S.selected);

  const select = () => {
    if (type === currentType) {
      return;
    }
    
    navigate({
      type,
      storyId: void 0
    });
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