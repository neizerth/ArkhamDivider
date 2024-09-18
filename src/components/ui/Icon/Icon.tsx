import S from './Icon.module.scss';

import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIcons } from '@/store/features/icons/icons';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import { propEq } from 'ramda';

export type IconProps = PropsWithClassName & {
	icon: string
}
export const Icon = ({ icon, className }: IconProps) => {
	const icons = useAppSelector(selectIcons);
	const entry = icons.find(propEq(icon, 'icon'));
	// const iconSet = useAppSelector(selectIconSet);

	const char = entry ? String.fromCharCode(entry.code) : '';
	return (
		<span className={classNames(S.icon, className)}>{char}</span>
	)
}