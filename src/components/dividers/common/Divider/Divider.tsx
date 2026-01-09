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
import { SarnetskyBandDivider } from '../../sarnetsky-band/SarnetskyBandDivider/SarnetskyBandDivider';

export type DividerProps = PropsWithClassName &
  IDivider & {
    index: number;
    rowIndex: number;
  };

const DividerMap: Record<string, React.ComponentType<DividerProps>> = {
  classic: ClassicDivider,
  invocation2018: Invocation2018Divider,
  sarnetsky: SarnetskyDivider,
  'arkham-deco': ArkhamDecoDivider,
  '3mm': ArkhamStarter3mmDivider,
  'arkhamesque-classic': ArkhamesqueClassicDivider,
  vintage: VintageDivider,
  'investigator-tokens': InvestigatorTokensDivider,
  'sarnetsky-band': SarnetskyBandDivider,
};

export const Divider = (props: DividerProps) => {
  const { categoryId } = useAppSelector(selectLayout);
  const DividerComponent = DividerMap[categoryId];

  if (!DividerComponent) {
    return null;
  }

  return (
    <>
      {DividerComponent && <DividerComponent {...props} />}
    </>
  );
};

export const DividerMemo = memo(Divider);
