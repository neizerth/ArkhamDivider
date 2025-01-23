import { PropsWithClassName } from '@/shared/types/util';
import S from './DividerMenu.module.scss';
import classNames from 'classnames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
// import { removeDivider } from '@/store/features/dividers/dividers';
import { copyDivider, removeDivider } from '@/app/store/features/dividers/dividers';
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
  const onCopy = () => dispatch(copyDivider(id));

  return (
    <div className={classNames(
      S.container,
      className
    )}>
    <div onClick={onCopy} className={S.item}>
      <Icon icon="icomoonfree-copy" className={classNames(S.icon, S.copy)}/>
    </div>
    <div onClick={onRemove} className={S.item}>
      <Icon icon="trash" className={classNames(S.icon, S.remove)}/>
    </div>
  </div>
  );
}