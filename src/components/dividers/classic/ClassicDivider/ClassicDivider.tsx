import { useEffect, useState } from 'react';

import S from './ClassicDivider.module.scss';

import { Icon, Guides, DividerMenu, DividerTitle } from '@/components';
import classNames from 'classnames';

import { PropsWithClassName } from '@/types/util';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';
import { selectBleeds } from '@/store/features/print/print';
import { selectLayout } from '@/store/features/layout/layout';
import { useTranslation } from 'react-i18next';
import { IDivider } from '@/types/dividers';
import { ClassicDividerStatus } from '../ClassicDividerStatus/ClassicDividerStatus';
import { ClassicDividerCost, ClassicDividerSkillCost } from '../ClassicDividerCost/ClassicDividerCost';
import { CardType } from '@/types/game';


export type ClassicDividerProps = PropsWithClassName & IDivider &{
	id: string
	background: string;
}

export const ClassicDivider = ({
	id,
	icon,
	cardType,
	previewIcon = icon,
	cost,
	name = '',
	background,
	size,
	className,
	campaignIcon,
}: ClassicDividerProps) => {
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
						<div className={classNames(S.icon, S.icon_large)}>
							<Icon icon={icon}/>
						</div>
					)}
					{previewIcon && (
						<div className={classNames(S.icon, S.icon_small)}>
							<Icon icon={previewIcon}/>
						</div>
					)}
					{cost && cost.level !== undefined && cardType && (
						<div className={S.cost}>
							<ClassicDividerCost
								type={cardType}
								level={cost.level}
							/>
						</div>
					)}
					<DividerMenu id={id} className={S.menu}/>

					<ClassicDividerStatus
						className={S.status}
						size={size}
						campaignIcon={campaignIcon}
					/>
				</div>
			</div>
		</div>
	);
}