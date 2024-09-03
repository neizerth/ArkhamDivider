import { ElementType, PropsWithChildren } from 'react';
import S from './Row.module.scss';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';

export type RowProps = PropsWithClassName & PropsWithChildren & {
	wrap?: boolean,
	inline?: boolean,
	gap?: boolean,
	alignItems?: string,
	as?: ElementType
};

export const LabelRow = (props: RowProps) => <Row {...props} as={'label'}/>

export const InlineRow = (props: RowProps) => <Row {...props} inline/>

export const Row = ({ 
	className, 
	inline = false,
	gap = true, 
	alignItems = 'center',
	as,
	wrap, 
	...props 
}: RowProps) => {
	const classes = classNames(
		S.container, 
		className,
		S[`alignItems_${alignItems}`],
		wrap && S.wrap,
		gap && S.gap
	);
	const Component = inline ? 'span' : as || 'div';
	return (
		<Component className={classes} {...props}/>
	);
}