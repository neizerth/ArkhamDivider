import React, { FormEvent, PropsWithChildren, ReactEventHandler, useEffect, useState } from 'react';
import S from './Divider.module.scss';
import classNames from 'classnames';
import Icon from '@/components/ui/Icon/Icon';

import { PropsWithClassName } from '@/types/util';


export type DividerProps = PropsWithChildren & PropsWithClassName & {
	id?: string
	name?: string
	icon?: string;
	background: string;
	language: string;
}

export const Divider = ({
	id = '',
	icon,
	name,
	children,
	background,
	language,
	...props
}: DividerProps) => {
	const [title, setTitle] = useState(name);

	useEffect(() => {
		setTitle(name);
	}, [name]);

	const className = classNames(
		S.container,
		props.className
	);

	const onTitleChange: ReactEventHandler = e => {
		const target = e.target as HTMLInputElement;
		const { value } = target;
		setTitle(value.trim() === '' ? name : value);
	}

	const clear = () => setTitle(name);
	const titleClassName = classNames(
		S.titleInput, 
		S[`titleInput_${language}`]
	);

	return (
		<div className={className}>
			
			{/* <h3 className={S.title} contentEditable={true} onInput={onTitleChange}>{dividerName}</h3> */}
			<div className={S.title}>
				<input className={titleClassName} onInput={onTitleChange} value={title}/>
				<Icon icon="dismiss" className={S.clearIcon} containerClassName={S.clear} onClick={clear}/>
			</div>
			<img className={S.background} src={background} alt={title}/>
			{icon && (
				<>
					<Icon icon={icon} className={classNames(S.icon, S.icon_small)}/>
					<Icon icon={icon} className={classNames(S.icon, S.icon_large)}/>
				</>
			)}
		</div>
	);
}