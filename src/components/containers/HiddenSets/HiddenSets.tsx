import classNames from 'classnames';
import S from './HiddenSets.module.scss';

import { Row, IconButton, Icon } from '@/components';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectHiddenSets, showAllSets } from '@/store/features/dividers/dividers';
import { PropsWithClassName } from '@/types/util';
import { useTranslation } from 'react-i18next';

export type HiddenSetsProps = PropsWithClassName & {

}

export const HiddenSets = ({ className }: HiddenSetsProps) => {
	const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const hiddenSets = useAppSelector(selectHiddenSets);

  const clear = () => dispatch(showAllSets());

  return (
    <div className={classNames(S.container, className)}>
      {hiddenSets.length > 0 && (
				<>
					<Row gap={false} className={S.hiddenInfo}>
						<Icon icon="hide" className={S.hideIcon}/>
						{hiddenSets.length}
					</Row>

					<IconButton 
						iconClassName={S.refreshIcon} 
						onClick={clear} 
						icon="repeat">
						{t('Clear')}
					</IconButton>
				</>
			)}
    </div>
  );
}