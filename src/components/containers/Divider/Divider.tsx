import React, { PropsWithChildren } from 'react';
import IcoMoon from "react-icomoon";
import S from './Divider.module.scss';
import classNames from 'classnames';

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

	return (
		<div className={className}>
			<h3 className={S.title}>{title}</h3>
		</div>
	);
}