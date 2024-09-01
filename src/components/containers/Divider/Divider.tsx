import React, { FormEvent, PropsWithChildren, ReactEventHandler, useEffect, useState } from 'react';
import S from './Divider.module.scss';
import classNames from 'classnames';
import Icon from '@/components/ui/Icon/Icon';

import colorBg from './images/color.png';
import grayscaleBg from './images/grayscale.png';
import { PropsWithClassName } from '@/types/util';

export enum DividerType {
	GRAYSCALE = 'GRAYSCALE',
	COLOR = 'COLOR',
}

export const DIVIDER_BACKGROUND = {
	GRAYSCALE: grayscaleBg.src,
	COLOR: colorBg.src,
}

export type DividerProps = PropsWithChildren & PropsWithClassName & {
	id?: string
	name?: string
	type?: DividerType
	icon?: string;
	language: string;
}

export const Divider = ({
	id = '',
	icon,
	name,
	children,
	language,
	type = DividerType.GRAYSCALE,
	...props
}: DividerProps) => {
	const [title, setTitle] = useState(name);

	useEffect(() => {
		setTitle(name);
	}, [name]);

	const className = classNames(
		S.container,
		S[`type_${type}`],
		props.className
	);

	const onTitleChange: ReactEventHandler = e => {
		const target = e.target as HTMLInputElement;
		const { value } = target;
		setTitle(value.trim() === '' ? name : value);
	}

	const clear = () => setTitle(name);

	const background = DIVIDER_BACKGROUND[type];
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