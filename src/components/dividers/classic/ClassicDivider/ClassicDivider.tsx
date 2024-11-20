import { PropsWithChildren, useEffect, useState } from 'react';

import S from './ClassicDivider.module.scss';
import { backgrounds } from './backgrounds';

import { Icon, DividerMenu, DividerText, DividerContent, NotExportable } from '@/components';
import classNames from 'classnames';

import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';
import { selectLayout } from '@/store/features/layout/layout';
import { ClassicDividerStatus } from '../ClassicDividerStatus/ClassicDividerStatus';
import { ClassicDividerIconXPCost } from '../xp/ClassicDividerIconXPCost/ClassicDividerIconXPCost';
import { propsEquals } from '@/util/criteria';
import { ClassicDividerSideXP } from '../xp/ClassicDividerSideXP/ClassicDividerSideXP';
import { definedIf } from '@/util/common';
import { useIconSelect } from '@/hooks/useIconSelect';
import { DividerProps } from '../../common/Divider/Divider';
import { useStoryTranslation } from '@/hooks/useStoryTranslation';

export type ClassicDividerProps = DividerProps & PropsWithChildren &{
	titleStroke?: boolean
	titleClassName?: string
}

export const ClassicDivider = ({
	id,
	cardType,
	xpCost,
	name = '',
	titleStroke = true,
	size,
	className,
	children,
	displayNumericXP = false,
	displaySideXP = false,
	displayCampaignIcon = false,
	type,
	...props
}: ClassicDividerProps) => {
	const { t } = useStoryTranslation(props.story);
	const layout = useAppSelector(selectLayout);

	const { 
		orientation, 
		color,
	} = layout;
	
	const campaignIcon = definedIf(props.campaignIcon, displayCampaignIcon);
	const [icon, selectIcon] = useIconSelect({
		defaultIcon: props.icon
	});

	const [previewIcon, selectPreviewIcon] = useIconSelect({
		defaultIcon: props.previewIcon || props.icon
	});

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
		S[realLanguage],
		S[orientation],
		S[type],
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
		props.titleClassName,
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
						stroke
						strokeClassName={classNames(
							titleInputClassName,
							S.textStroke
						)}
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
						<div className={S.iconSelect} onClick={selectIcon}/>
						<Icon 
							icon={icon} 
							className={S.iconItem}
							scale={'square'}
						/>
					</div>
				)}
				{previewIcon && (
					<div 
						className={classNames(
							S.icon, 
							S.icon_small,
							S[`icon_small_${icon}`],
							xpCost && xpCost.level > 0 ? S.icon_small_withXP : S.icon_small_noXP
						)}
					>
						<div className={S.iconSelect} onClick={selectPreviewIcon}/>
						<Icon 
							icon={previewIcon} 
							className={S.iconItem}
							scale={'circle'}
						/>
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

				<NotExportable>
					<DividerMenu id={id} className={S.menu}/>
				</NotExportable>

				<ClassicDividerStatus
					className={S.status}
					size={size}
					campaignIcon={campaignIcon}
				/>
			</DividerContent>
		</div>
	);
}