import { useTranslation } from 'react-i18next';
import S from './LayoutMenu.module.scss';
import { Container } from '@/components';
import { PropsWithChildren } from 'react';
import { LayoutType } from '@/types/layouts';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout, selectType } from '@/store/features/layout/layout';
import classNames from 'classnames';
import { useAppNavigate } from '@/hooks/useAppNavigate';
import { menu } from './menu';


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

  const { types, id } = useAppSelector(selectLayout);
  const items = menu.filter(({ type }) => types.includes(type));

  console.log({ types, id });

  return (
    <div className={S.container}>
      <Container>
        <div className={S.menu}>
          {items.map(({ type, name }) => (
            <LayoutMenuItem type={type} key={type}>
              {t(name)}
            </LayoutMenuItem>
          ))}
        </div>
      </Container>
    </div>
  );
}