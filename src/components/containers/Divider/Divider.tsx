import { PropsWithChildren, ReactEventHandler, useEffect, useState } from 'react';
import horizontalStyle from './styles/horizontal.module.scss';
import verticalStyle from './styles/vertical.module.scss';

import { Icon, Guides } from '@/components';
import classNames from 'classnames';

import { PropsWithClassName } from '@/types/util';
import { DividerType } from '@/types/dividers';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { hideSet } from '@/store/features/dividers/dividers';

export const DIVIDER_STYLE = {
	[DividerType.HORIZONTAL]: horizontalStyle,
	[DividerType.VERTICAL]: verticalStyle
}

export type DividerProps = PropsWithChildren & PropsWithClassName & {
	id: string
	layoutId?: string;
	name?: string
	icon?: string;
	color?: boolean;
	type: DividerType;
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
	color,
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
		color ? S.color : S.grayscale,
		className
	);

	const dividerClassName = classNames(
		S.divider,
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
		S.title, 
		title.length > 30 && S.titleInput_l,
		title.length > 40 && S.titleInput_xl,
		S[`title_${language}`]
	);

	const guidesClassName = classNames(
		S.guides
	)

	return (
		<div className={containerClassName} data-layout={layoutId} data-color={color} data-grayscale={!color}>
			<div className={guidesClassName}>
				<Guides className={S.guidesContent}/>
			</div>
			<div className={wrapperClassName}>
				<div className={dividerClassName}>
					<div className={titleClassName}>
						<div className={S.titleContent}>
							<input className={S.titleInput} onInput={onTitleChange} value={title}/>
							<div className={S.clear}>
								<Icon icon="dismiss" className={S.clearIcon} onClick={clear}/>
							</div>
						</div>
					</div>
					<img className={S.background} src={background} alt={title}/>
					{icon && (
						<>
							<Icon icon={icon} className={classNames(S.icon, S.icon_small)}/>
							<Icon icon={icon} className={classNames(S.icon, S.icon_large)}/>
						</>
					)}

					<div className={S.remove}>
						<Icon icon="hide" className={S.removeIcon} onClick={onRemove}/>
					</div>
				</div>
			</div>
		</div>
	);
}