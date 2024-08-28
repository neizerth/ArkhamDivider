import React, { FormEvent, PropsWithChildren } from 'react';
import IcoMoon from "react-icomoon";
import S from './Divider.module.scss';
import classNames from 'classnames';
import Icon from '@/components/ui/Icon/Icon';

export enum DividerType {
	GRAYSCALE = 'grayscale',
	COLOR = 'color',
}

export type DividerProps = PropsWithChildren & {
	title: string
	type?: DividerType
	icon?: string
}

export const Divider = ({
	icon,
	title,
	children,
	type = DividerType.COLOR
}: DividerProps) => {
	const className = classNames(
		S.container,
		S[`type_${type}`]
	);

	const onTitleChange = ({ target }: FormEvent) => {
		const { textContent } = target as HTMLElement;
	}

	return (
		<div className={className}>
			<h3 className={S.title} contentEditable={true} onInput={onTitleChange}>{title}</h3>
			{icon && (
				<>
					<Icon icon={icon} className={classNames(S.icon, S.icon_small)}/>
					<Icon icon={icon} className={classNames(S.icon, S.icon_large)}/>
				</>
			)}
		</div>
	);
}