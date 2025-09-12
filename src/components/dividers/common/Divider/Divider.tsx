import { memo } from 'react';
import { ArkhamDecoDivider } from '@/components/dividers/arkham-deco/ArkhamDecoDivider/ArkhamDecoDivider';
import { ClassicDivider } from '@/components/dividers/classic/ClassicDivider/ClassicDivider';
import { Invocation2018Divider } from '@/components/dividers/invocation2018/Invocation2018Divider/Invocation2018Divider';
import { SarnetskyDivider } from '@/components/dividers/sarnetsky/SarnetskyDivider/SarnetskyDivider';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLayout } from '@/shared/store/features/layout/layout';
// import S from './Divider.module.scss';
import { IDivider } from '@/shared/types/dividers';
import { PropsWithClassName } from '@/shared/types/util';
import { ArkhamStarter3mmDivider } from '../../arkham-starter-3mm/ArkhamStarter3mmDivider/ArkhamStarter3mmDivider';
import { ArkhamesqueClassicDivider } from '../../arkhamesque-classic/ArkhamesqueClassicDivider/ArkhamesqueClassicDivider';
import { InvestigatorTokensDivider } from '../../investigator-tokens/InvestigatorTokensDivider/InvestigatorTokensDivider';
import { VintageDivider } from '../../vintage/VintageDivider/VintageDivider';

export type DividerProps = PropsWithClassName &
  IDivider & {
    index: number;
    rowIndex: number;
  };

export const Divider = (props: DividerProps) => {
  const { categoryId } = useAppSelector(selectLayout);
  return (
    <>
      {categoryId === 'classic' && <ClassicDivider {...props} />}
      {categoryId === 'invocation2018' && <Invocation2018Divider {...props} />}
      {categoryId === 'sarnetsky' && <SarnetskyDivider {...props} />}
      {categoryId === 'arkham-deco' && <ArkhamDecoDivider {...props} />}
      {categoryId === '3mm' && <ArkhamStarter3mmDivider {...props} />}
      {categoryId === 'arkhamesque-classic' && <ArkhamesqueClassicDivider {...props} />}
      {categoryId === 'vintage' && <VintageDivider {...props} />}
      {categoryId === 'investigator-tokens' && <InvestigatorTokensDivider {...props} />}
    </>
  );
};

export const DividerMemo = memo(Divider);
