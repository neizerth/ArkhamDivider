import React, { FormEvent, PropsWithChildren, ReactEventHandler, useEffect, useState } from 'react';
import horizontalStyle from './styles/horizontal.module.scss';
import verticalStyle from './styles/vertical.module.scss';

import classNames from 'classnames';
import Icon from '@/components/ui/Icon/Icon';

import { PropsWithClassName } from '@/types/util';
import { IDividerType } from '@/types/dividers';

export const DIVIDER_STYLE = {
	[IDividerType.HORIZONTAL]: horizontalStyle,
	[IDividerType.VERTICAL]: verticalStyle
}

export type DividerProps = PropsWithChildren & PropsWithClassName & {
	id?: string
	layoutId?: string;
	name?: string
	icon?: string;
	type: IDividerType;
	background: string;
	language: string;
}

export const Divider = ({
	id = '',
	icon,
	name = '',
	type,
	layoutId,
	children,
	background,
	language,
	...props
}: DividerProps) => {
	const [title, setTitle] = useState(name);
	const S = DIVIDER_STYLE[type];

	useEffect(() => {
		setTitle(name);
	}, [name]);

	const className = classNames(
		S.container,
		layoutId && S[`layout_${layoutId}`],
		type && S[`type_`+type],
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
		title.length > 30 && S.titleInput_largeText,
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