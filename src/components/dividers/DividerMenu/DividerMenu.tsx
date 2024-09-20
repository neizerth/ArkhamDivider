import { PropsWithClassName } from '@/types/util';
import S from './DividerMenu.module.scss';
import classNames from 'classnames';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { removeDivider } from '@/store/features/dividers/dividers';
// import { copyDivider, removeDivider } from '@/store/features/dividers/dividers';
import { Icon } from '@/components';

export type DividerMenuProps = PropsWithClassName &{
  id: string
}

export const DividerMenu = ({ 
  id, 
  className 
}: DividerMenuProps) => {
  
  const dispatch = useAppDispatch()
	const onRemove = () => dispatch(removeDivider(id));
  // const onCopy = () => dispatch(copyDivider(id));

  return (
    <div className={classNames(S.container, className)}>
      {/* <Icon icon="copy" className={classNames(S.icon, S.copy)} onClick={onCopy}/> */}
      <Icon icon="trash" className={classNames(S.icon, S.remove)} onClick={onRemove}/>
    </div>
  );
}