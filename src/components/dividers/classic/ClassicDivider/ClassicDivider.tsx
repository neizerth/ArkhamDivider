import { PropsWithChildren, useEffect, useState } from 'react';

import S from './ClassicDivider.module.scss';
import { backgrounds } from './backgrounds';

import { Icon, DividerMenu, DividerText, DividerContent } from '@/components';
import classNames from 'classnames';

import { PropsWithClassName } from '@/types/util';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';
import { selectLayout } from '@/store/features/layout/layout';
import { useTranslation } from 'react-i18next';
import { IDivider } from '@/types/dividers';
import { ClassicDividerStatus } from '../ClassicDividerStatus/ClassicDividerStatus';
import { ClassicDividerIconXPCost } from '../xp/ClassicDividerIconXPCost/ClassicDividerIconXPCost';
import { propsEquals } from '@/util/criteria';
import { ClassicDividerSideXP } from '../xp/ClassicDividerSideXP/ClassicDividerSideXP';
import { definedIf } from '@/util/common';

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
	children,
	displayNumericXP = false,
	displaySideXP = false,
	displayCampaignIcon = false,
	...props
}: ClassicDividerProps) => {
	const { t } = useTranslation();
	const layout = useAppSelector(selectLayout);

	const { 
		orientation, 
		color,
	} = layout;
	
	const campaignIcon = definedIf(props.campaignIcon, displayCampaignIcon);

	const background = props.background || backgrounds.find(
		propsEquals({
			orientation,
			color
		})
	)?.src;
	
	const translatedName = t(name);

	const [title, setTitle] = useState(translatedName);

	const language = useAppSelector(selectLanguage);
	const realLanguage = translatedName === name ? 'en' : language;

	useEffect(() => {
		setTitle(translatedName);
	}, [translatedName]);

	const containerClassName = classNames(
		S.container,
		S[orientation],
		color ? S.color : S.grayscale, 
		className
	);

	const titleSize = ['ko', 'zh', 'zh-cn'].includes(realLanguage) ? title.length * 2 : title.length;

	const titleInputClassName = classNames(
		S.titleInput,
		titleStroke && S.stroke,
		S[`titleInput_${realLanguage}`]
	)

	const titleClassName = classNames(
		S.title,
		titleSize <= 30 && S.title_m,
		titleSize > 30 && S.title_l,
		titleSize > 40 && S.title_xl,
		titleSize > 50 && S.title_xxl,
	)

	return (
		<div className={containerClassName}>
			<DividerContent>
				<div className={titleClassName}>
					<DividerText
						defaultValue={translatedName}
						className={S.titleContent}
						inputClassName={titleInputClassName}
						onChange={setTitle}
						fixedFontSize={false}
						minFontSize={8}
					/>
				</div>
				{background && <img className={S.background} src={background} alt={title}/>}
				{icon && (
					<div className={classNames(S.icon, S.icon_large)}>
						<Icon icon={icon}/>
					</div>
				)}
				{previewIcon && (
					<div 
						className={classNames(
							S.icon, 
							S.icon_small,
							xpCost && xpCost.level > 0 ? S.icon_small_withXP : S.icon_small_noXP
						)}
					>
						<Icon icon={previewIcon}/>
					</div>
				)}
				{xpCost && cardType && (
					<div className={S.xpCost}>
						<ClassicDividerIconXPCost
							type={cardType}
							xpCost={xpCost}
						/>
					</div>
				)}
				{displaySideXP && xpCost && (
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
			</DividerContent>
		</div>
	);
}