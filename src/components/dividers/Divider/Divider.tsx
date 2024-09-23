import { PropsWithClassName } from '@/types/util';
// import S from './Divider.module.scss';
import { IDivider } from '@/types/dividers';
import { ClassicDivider } from '../classic/ClassicDivider/ClassicDivider';
import { Invocation2018Divider } from '../invocation2018/Invocation2018Divider/Invocation2018Divider';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';

export type DividerProps = PropsWithClassName & IDivider;

export const Divider = (props: DividerProps) => {
  const { id } = useAppSelector(selectLayout);
  return (
    <>
      {id === 'classic' && <ClassicDivider {...props}/>}
      {id === 'invocation2018' && <Invocation2018Divider {...props}/>}
    </>
  );
}