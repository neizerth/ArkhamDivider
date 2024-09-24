import { PropsWithChildren, useEffect, useState } from 'react';

import S from './ClassicDivider.module.scss';
import { backgrounds } from './backgrounds';

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
import { ClassicDividerIconXPCost } from '../xp/ClassicDividerIconXPCost/ClassicDividerIconXPCost';
import { propsEquals } from '@/util/criteria';
import { ClassicDividerSideXP } from '../xp/ClassicDividerSideXP/ClassicDividerSideXP';

export type ClassicDividerProps = PropsWithClassName & IDivider & PropsWithChildren &{
	titleStroke?: boolean
}

export const ClassicDivider = ({
	id,
	icon,
	cardType,
	previewIcon = icon,
	xpCost,
	name = '',
	titleStroke = true,
	size,
	className,
	campaignIcon,
	children,
	displayNumericXP = false,
	displaySideXP = false,
	...props
}: ClassicDividerProps) => {
	const { t } = useTranslation();
	const bleeds = useAppSelector(selectBleeds);
	const layout = useAppSelector(selectLayout);

	const { 
		orientation, 
		color,
	} = layout;
	
	const background = props.background || backgrounds.find(
		propsEquals({
			orientation,
			color
		})
	)?.src;
	
	const translatedName = t(name);

	const [title, setTitle] = useState(translatedName);

	const language = useAppSelector(selectLanguage);

	const displayXP = xpCost && xpCost.level > 0;

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
		titleStroke && S.stroke,
		title.length > 30 && S.titleInput_l,
		title.length > 40 && S.titleInput_xl,
		title.length > 50 && S.titleInput_xxl,
		S[`titleInput_${language}`]
	)

	return (
		<div 
			className={containerClassName} 
		>
			<div className={S.guides}>
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
					{background && <img className={S.background} src={background} alt={title}/>}
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
					{displayXP && cardType && (
						<div className={S.xpCost}>
							<ClassicDividerIconXPCost
								type={cardType}
								xpCost={xpCost}
							/>
						</div>
					)}
					{displaySideXP && displayXP && (
						<div className={S.sideXP}>
							<ClassicDividerSideXP 
								numeric={displayNumericXP}
								xpCost={xpCost}
							/>
						</div>
					)}
					
					{children}

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