import { useEffect, useState } from 'react';

import S from './Divider.module.scss';

import { Icon, Guides, DividerMenu, DividerTitle } from '@/components';
import classNames from 'classnames';

import { PropsWithClassName } from '@/types/util';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';
import { selectBleeds } from '@/store/features/print/print';
import { selectLayout } from '@/store/features/layout/layout';
import { useTranslation } from 'react-i18next';


export type DividerProps = PropsWithClassName & {
	id: string
	layoutId?: string;
	name?: string
	icon?: string;
	campaignIcon?: string;
	background: string;
	size?: number
}

export const Divider = ({
	id,
	icon,
	name = '',
	layoutId,
	background,
	size,
	className,
	campaignIcon,
}: DividerProps) => {
	const { t } = useTranslation();
	const bleeds = useAppSelector(selectBleeds);
	const layout = useAppSelector(selectLayout);

	const { 
		orientation, 
		color,
	} = layout;

	const translatedName = t(name);

	const [title, setTitle] = useState(translatedName);

	const language = useAppSelector(selectLanguage);

	useEffect(() => {
		setTitle(translatedName);
	}, [translatedName]);

	const containerClassName = classNames(
		S.container,
		orientation && S[orientation],
		bleeds ? S.withBleeds : S.noBleeds,
		color ? S.color : S.grayscale,
		className
	);

	const onTitleChange = (value: string) => {
		if (!value.trim()) {
			return clear();
		}
		setTitle(value);
	}

	const clear = () => setTitle(translatedName);

	const titleInputClassName = classNames(
		S.titleInput,
		title.length > 30 && S.titleInput_l,
		title.length > 40 && S.titleInput_xl,
		title.length > 50 && S.titleInput_xxl,
		S[`titleInput_${language}`]
	)

	const guidesClassName = classNames(
		S.guides
	)

	return (
		<div 
			className={containerClassName} 
			data-layout={layoutId} 
			data-color={color} 
			data-grayscale={!color}
		>
			<div className={guidesClassName}>
				<Guides className={S.guidesContent}/>
			</div>
			<div className={S.wrapper}>
				<div className={S.divider}>
					<div className={S.title}>
						<DividerTitle
							title={title}
							className={S.titleContent}
							inputClassName={titleInputClassName}
							onChange={onTitleChange}
							onClear={clear}
						/>
					</div>
					<img className={S.background} src={background} alt={title}/>
					{icon && (
						<>
							<div className={classNames(S.icon, S.icon_small)}>
								<Icon icon={icon}/>
							</div>
							<div className={classNames(S.icon, S.icon_large)}>
								<Icon icon={icon}/>
							</div>
						</>
					)}

					<DividerMenu id={id} className={S.menu}/>
					<div className={S.status}>
						
						{campaignIcon && (
							<div className={S.campaignIcon}>
								<Icon icon={campaignIcon}/>
							</div>
						)}
						{Boolean(size) && (
							<div className={S.size}>
								{!campaignIcon && '∑'} {size}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}