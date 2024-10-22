import { PropsWithClassName } from '@/types/util';
// import S from './Divider.module.scss';
import { IDivider } from '@/types/dividers';
import { ClassicDivider } from '../classic/ClassicDivider/ClassicDivider';
import { Invocation2018Divider } from '../invocation2018/Invocation2018Divider/Invocation2018Divider';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { SarnetskyDivider } from '../sarnetsky/SarnetskyDivider/SarnetskyDivider';
import { ArkhamDecoDivider } from '../arkham-deco/ArkhamDecoDivider/ArkhamDecoDivider';

export type DividerProps = PropsWithClassName & IDivider;

export const Divider = (props: DividerProps) => {
  const { categoryId } = useAppSelector(selectLayout);
  return (
    <>
      {categoryId === 'classic' && <ClassicDivider {...props}/>}
      {categoryId === 'invocation2018' && <Invocation2018Divider {...props}/>}
      {categoryId === 'sarnetsky' && <SarnetskyDivider {...props}/>}
      {categoryId === 'arkham-deco' && <ArkhamDecoDivider {...props}/>}
    </>
  );
}