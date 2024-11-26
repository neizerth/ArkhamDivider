import { Guides } from '@/components/print/Guides/Guides';
import S from './DividerContent.module.scss';
import { PropsWithClassName } from '@/types/util';
import { PropsWithChildren } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { selectBleed } from '@/store/features/print/print';

import { Wrapper, GuidesContent, Content } from './components';
import classNames from 'classnames';
import { NotExportable } from '@/components/ui/behavior/NotExportable/NotExportable';

export type DividerContentProps = PropsWithClassName & PropsWithChildren & {

}

export const DividerContent = ({
  children
}: DividerContentProps) => {
  const layout = useAppSelector(selectLayout);
  const useBleed = useAppSelector(selectBleed);

  const styledProps = {
    $bleed: useBleed,
    $layout: layout
  }

  return (
    <div 
      className={classNames(
        S.container,
        useBleed && 'divider'
      )}
    >
      <NotExportable>
        <GuidesContent className={S.guides} {...styledProps}>
          <Guides className={S.guidesContent} guideClassName={S.guide}/>
        </GuidesContent>
      </NotExportable>
			<Wrapper className={
        classNames(
          S.wrapper, 
          !useBleed && 'divider'
        )} 
        {...styledProps}
      >
				<Content className={S.divider} {...styledProps}>
          {children}
        </Content>
      </Wrapper>
    </div>
  );
}