import React, { PropsWithChildren } from 'react';
import S from './Row.module.scss';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';

export type RowProps = PropsWithClassName & PropsWithChildren & {
	wrap?: boolean
};

export const Row = ({ className, wrap, ...props }: RowProps) => {
	const classes = classNames(
		S.container, 
		className,
		wrap && S.wrap
	);
	return (
		<div className={classes} {...props}/>
	);
}