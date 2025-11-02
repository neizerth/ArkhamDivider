import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { Guides } from '@/components/print/Guides/Guides';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { selectBleed } from '@/shared/store/features/print/print';
import { PropsWithClassName } from '@/shared/types/util';
import { Content, GuidesContent, Wrapper } from './components';
import S from './DividerContent.module.scss';

export type DividerContentProps = PropsWithClassName & PropsWithChildren & {};

export const DividerContent = ({ children, className }: DividerContentProps) => {
  const layout = useAppSelector(selectLayout);
  const useBleed = useAppSelector(selectBleed);

  const styledProps = {
    $bleed: useBleed,
    $layout: layout,
  };

  return (
    <div className={classNames(S.container, useBleed && 'divider', className)}>
      <GuidesContent className={S.guides} {...styledProps}>
        <Guides className={S.guidesContent} guideClassName={S.guide} />
      </GuidesContent>
      <Wrapper className={classNames(S.wrapper, !useBleed && 'divider')} {...styledProps}>
        <Content className={S.divider} {...styledProps}>
          {children}
        </Content>
      </Wrapper>
    </div>
  );
};
