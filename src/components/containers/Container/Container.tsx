import { PropsWithClassName } from '@/shared/types/util';
import S from './Container.module.scss';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

export type ContainerProps = PropsWithClassName & PropsWithChildren;

export const Container = ({ className, ...props }: ContainerProps) => {
	const classes = classNames(S.container, className);
	
	return (
		<div className={classes} {...props}/>
	);
}