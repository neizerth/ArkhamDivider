import S from './Icon.module.scss';

import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIcons } from '@/store/features/icons/icons';
import classNames from 'classnames';
import { propEq } from 'ramda';
import { ComponentProps } from 'react';

export type IconProps = ComponentProps<'span'>  & {
	icon: string
}
export const Icon = ({ icon, className, ...props }: IconProps) => {
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
			{...props}
		>
			{char}
		</span>
	)
}