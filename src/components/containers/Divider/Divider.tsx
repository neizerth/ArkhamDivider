import { PropsWithChildren, ReactEventHandler, useEffect, useState } from 'react';
import horizontalStyle from './styles/horizontal.module.scss';
import verticalStyle from './styles/vertical.module.scss';

import { Icon } from '@/components';
import classNames from 'classnames';

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
	onRemove: () => void;
}

export const Divider = ({
	icon,
	name = '',
	type,
	layoutId,
	background,
	language,
	onRemove,
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
			<div className={S.title}>
				<input className={titleClassName} onInput={onTitleChange} value={title}/>
				<Icon icon="dismiss" className={S.clear} onClick={clear}/>
			</div>
			<img className={S.background} src={background} alt={title}/>
			{icon && (
				<>
					<Icon icon={icon} className={classNames(S.icon, S.icon_small)}/>
					<Icon icon={icon} className={classNames(S.icon, S.icon_large)}/>
				</>
			)}

			<Icon icon="hide" className={S.remove} onClick={onRemove}/>
		</div>
	);
}