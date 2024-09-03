import { PropsWithChildren, ReactEventHandler, useEffect, useState } from 'react';
import horizontalStyle from './styles/horizontal.module.scss';
import verticalStyle from './styles/vertical.module.scss';

import { Icon, Guides } from '@/components';
import classNames from 'classnames';

import { PropsWithClassName } from '@/types/util';
import { IDividerType } from '@/types/dividers';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { hideSet } from '@/store/features/dividers/dividers';

export const DIVIDER_STYLE = {
	[IDividerType.HORIZONTAL]: horizontalStyle,
	[IDividerType.VERTICAL]: verticalStyle
}

export type DividerProps = PropsWithChildren & PropsWithClassName & {
	id: string
	layoutId?: string;
	name?: string
	icon?: string;
	type: IDividerType;
	background: string;
	language: string;
  bleeds?: boolean;
	dividerClassName?: string
	wrapperClassName?: string
}

export const Divider = ({
	id,
	icon,
	name = '',
	type,
	layoutId,
	background,
	language,
	bleeds,
	className,
	...props
}: DividerProps) => {
	const [title, setTitle] = useState(name);
	const dispatch = useAppDispatch();
	const S = DIVIDER_STYLE[type];

	useEffect(() => {
		setTitle(name);
	}, [name]);

	const onRemove = () => dispatch(hideSet(id));

	const containerClassName = classNames(
		S.container,
		bleeds ? S.withBleeds : S.noBleeds,
		className
	);

	const dividerClassName = classNames(
		S.divider,
		layoutId && S[`layout_${layoutId}`],
		type && S[`type_`+type],
		props.dividerClassName
	);

	const wrapperClassName = classNames(
		S.wrapper,
		props.wrapperClassName
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

	const guidesClassName = classNames(
		S.guides
	)

	return (
		<div className={containerClassName}>
			<div className={guidesClassName}>
				<Guides className={S.guidesContent}/>
			</div>
			<div className={wrapperClassName}>
				<div className={dividerClassName}>
					<div className={S.title}>
						<input className={titleClassName} onInput={onTitleChange} value={title}/>
						<div className={S.clear}>
							<Icon icon="dismiss" className={S.clearIcon} onClick={clear}/>
						</div>
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
			</div>
		</div>
	);
}