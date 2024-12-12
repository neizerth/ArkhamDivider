import { PropsWithClassName } from '@/types/util';
// import S from './Divider.module.scss';
import { IDivider } from '@/types/dividers';
import { ClassicDivider } from '@/components/dividers/classic/ClassicDivider/ClassicDivider';
import { Invocation2018Divider } from '@/components/dividers/invocation2018/Invocation2018Divider/Invocation2018Divider';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { SarnetskyDivider } from '@/components/dividers/sarnetsky/SarnetskyDivider/SarnetskyDivider';
import { ArkhamDecoDivider } from '@/components/dividers/arkham-deco/ArkhamDecoDivider/ArkhamDecoDivider';
import { ArkhamStarter3mmDivider } from '../../arkham-starter-3mm/ArkhamStarter3mmDivider/ArkhamStarter3mmDivider';
import { ArkhamesqueClassicDivider } from '../../arkhamesque-classic/ArkhamesqueClassicDivider/ArkhamesqueClassicDivider';
import { memo } from 'react';
import { VintageDivider } from '../../vintage/VintageDivider/VintageDivider';

export type DividerProps = PropsWithClassName & IDivider & {
	index: number
	rowIndex: number
}

export const Divider = (props: DividerProps) => {
  const { categoryId } = useAppSelector(selectLayout);
  return (
    <>
      {categoryId === 'classic' && <ClassicDivider {...props}/>}
      {categoryId === 'invocation2018' && <Invocation2018Divider {...props}/>}
      {categoryId === 'sarnetsky' && <SarnetskyDivider {...props}/>}
      {categoryId === 'arkham-deco' && <ArkhamDecoDivider {...props}/>}
      {categoryId === '3mm' && <ArkhamStarter3mmDivider {...props}/>}
      {categoryId === 'arkhamesque-classic' && <ArkhamesqueClassicDivider {...props}/>}
      {categoryId === 'vintage' && <VintageDivider {...props}/>}
    </>
  );
}

export const DividerMemo = memo(Divider);