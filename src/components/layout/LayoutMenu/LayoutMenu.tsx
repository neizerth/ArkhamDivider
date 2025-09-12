import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components';
import { useAppNavigate } from '@/shared/lib/hooks/useAppNavigate';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLayout, selectType } from '@/shared/store/features/layout/layout';
import { LayoutType } from '@/shared/types/layouts';
import S from './LayoutMenu.module.scss';
import { menu } from './menu';

export type LayoutMenuItemProps = PropsWithChildren & {
  type: LayoutType;
  disabled?: boolean;
};

export const LayoutMenuItem = ({ type, children, disabled }: LayoutMenuItemProps) => {
  const currentType = useAppSelector(selectType);
  const navigate = useAppNavigate();

  const isSelected = currentType === type;

  const classList = classNames(S.item, isSelected && S.selected, disabled ? S.disabled : S.enabled);

  const select = () => {
    if (disabled) {
      return;
    }
    if (type === currentType) {
      return;
    }

    navigate({
      type,
      storyId: void 0,
    });
  };

  return (
    <div className={classList} onClick={select}>
      {children}
    </div>
  );
};

export const LayoutMenu = () => {
  const { t } = useTranslation();

  const { types } = useAppSelector(selectLayout);
  const getIsEnabled = (type: LayoutType) => types.includes(type);

  return (
    <div className={S.container}>
      <Container>
        <div className={S.menu}>
          {menu.map(({ type, name }) => (
            <LayoutMenuItem type={type} key={type} disabled={!getIsEnabled(type)}>
              {t(name)}
            </LayoutMenuItem>
          ))}
        </div>
      </Container>
    </div>
  );
};
