import classNames from 'classnames';
import S from './FontIcon.module.scss';
import { propEq } from 'ramda';
import { useAppSelector } from '@/hooks/useAppSelector';
import { PropsWithClassName } from '@/types/util';
import { selectIcons } from '@/store/features/icons/icons';

export type FontIconProps = PropsWithClassName & {
  icon: string
}

export const FontIcon = ({
  icon, 
	className, 
}: FontIconProps) => {
  const icons = useAppSelector(selectIcons);
	const entry = icons.find(propEq(icon, 'icon'));

	const char = entry ? String.fromCharCode(entry.code) : '';
	// const fontSize = entry?.ratio && `${entry.ratio}em`;
	const transform = entry?.ratio && entry?.ratio > 1 ? `scale(${1 / entry.ratio})` : '';

	const style = {
		transform
	}
	return (
		<span 
			className={classNames(S.icon, S[icon], className)}
			style={style}
			data-icon={icon}
		>
			{char}
		</span>
	)
}