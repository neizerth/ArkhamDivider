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

export type DividerProps = PropsWithClassName & IDivider;

export const Divider = (props: DividerProps) => {
  const { categoryId } = useAppSelector(selectLayout);
  return (
    <>
      {categoryId === 'classic' && <ClassicDivider {...props}/>}
      {categoryId === 'invocation2018' && <Invocation2018Divider {...props}/>}
      {categoryId === 'sarnetsky' && <SarnetskyDivider {...props}/>}
      {categoryId === 'arkham-deco' && <ArkhamDecoDivider {...props}/>}
      {categoryId === '3mm' && <ArkhamStarter3mmDivider {...props}/>}
    </>
  );
}