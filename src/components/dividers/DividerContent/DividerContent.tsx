import { Guides } from '@/components/print/Guides/Guides';
import S from './DividerContent.module.scss';
import { PropsWithClassName } from '@/types/util';
import { PropsWithChildren } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { selectBleeds } from '@/store/features/print/print';

import { Wrapper, GuidesContent, Content } from './components';

export type DividerContentProps = PropsWithClassName & PropsWithChildren & {

}

export const DividerContent = ({
  children
}: DividerContentProps) => {
  const layout = useAppSelector(selectLayout);
  const useBleeds = useAppSelector(selectBleeds);

  const styledProps = {
    $bleeds: useBleeds,
    $layout: layout
  }

  return (
    <div className={S.container}>
      <GuidesContent className={S.guides} {...styledProps}>
				<Guides className={S.guidesContent}/>
			</GuidesContent>
			<Wrapper className={S.wrapper} {...styledProps}>
				<Content className={S.divider} {...styledProps}>
          {children}
        </Content>
      </Wrapper>
    </div>
  );
}