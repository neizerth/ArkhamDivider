import { PropsWithChildren, useEffect, useState } from "react";

import S from "./ClassicDivider.module.scss";
import { backgrounds } from "./backgrounds";

import {
	Icon,
	DividerMenu,
	DividerText,
	DividerContent,
	NotExportable,
} from "@/components";
import classNames from "classnames";

import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLanguage } from "@/shared/store/features/language/language";
import { selectLayout } from "@/shared/store/features/layout/layout";
import { ClassicDividerStatus } from "../ClassicDividerStatus/ClassicDividerStatus";
import { ClassicDividerIconXPCost } from "../xp/ClassicDividerIconXPCost/ClassicDividerIconXPCost";
import { propsEquals } from "@/shared/lib/features/util/criteria";
import { ClassicDividerSideXP } from "../xp/ClassicDividerSideXP/ClassicDividerSideXP";
import { definedIf } from "@/shared/lib/features/util/common";
import { useIconSelect } from "@/shared/lib/hooks/useIconSelect";
import { DividerProps } from "../../common/Divider/Divider";
import { useStoryTranslation } from "@/shared/lib/hooks/useStoryTranslation";
import { CircleIcon } from "@/components/ui/icons/CircleIcon/CircleIcon";
import { DividerCornerRadius } from "../../common/DividerCornerRadius/DividerCornerRadius";
import { selectCornerRadius } from "@/shared/store/features/print/print";

export type ClassicDividerProps = DividerProps &
	PropsWithChildren & {
		titleStroke?: boolean;
		titleClassName?: string;
		cornerRadiusClassName?: string;
	};

export const ClassicDivider = ({
	id,
	cardType,
	xpCost,
	name = "",
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
	const cornerRadius = useAppSelector(selectCornerRadius);

	const { orientation, color } = layout;

	const campaignIcon = definedIf(props.campaignIcon, displayCampaignIcon);
	const [icon, selectIcon] = useIconSelect({
		defaultIcon: props.icon,
	});

	const [previewIcon, selectPreviewIcon] = useIconSelect({
		defaultIcon: props.previewIcon || props.icon,
	});

	const hq = layout.customParams?.hq || false;

	const background =
		props.background ||
		backgrounds.find(
			propsEquals({
				orientation,
				color,
				hq
			}),
		)?.src;

	const translatedName = t(name);

	const [title, setTitle] = useState(translatedName);

	const language = useAppSelector(selectLanguage);
	const realLanguage = translatedName === name ? "en" : language;

	useEffect(() => {
		setTitle(translatedName);
	}, [translatedName]);

	const containerClassName = classNames(
		S.container,
		S[layout.id],
		S[realLanguage],
		S[orientation],
		S[type],
		color ? S.color : S.grayscale,
		className,
	);

	const titleSize = ["ko", "zh", "zh-cn"].includes(realLanguage)
		? title.length * 2
		: title.length;

	const titleInputClassName = classNames(
		S.titleInput,
		titleStroke && S.stroke,
		S[`titleInput_${realLanguage}`],
	);

	const titleClassName = classNames(
		S.title,
		S[`title_${realLanguage}`],
		props.titleClassName,
		titleSize <= 30 && S.title_m,
		titleSize > 30 && S.title_l,
		titleSize > 40 && S.title_xl,
		titleSize > 50 && S.title_xxl,
	);

	return (
		<div className={containerClassName}>
			<DividerContent>
				<div className={titleClassName}>
					<DividerText
						stroke
						strokeClassName={classNames(titleInputClassName, S.textStroke)}
						defaultValue={translatedName}
						className={S.titleContent}
						inputClassName={titleInputClassName}
						onChange={setTitle}
						fixedFontSize={false}
						minFontSize={8}
					/>
				</div>
				{background && (
					<img className={S.background} src={background} alt={title} />
				)}
				{icon && (
					<div className={classNames(S.icon, S.icon_large)}>
						<div className={S.iconSelect} onClick={selectIcon} />
						<Icon icon={icon} className={S.iconItem} scaleType={"square"} />
					</div>
				)}
				{previewIcon && (
					<div
						className={classNames(
							S.icon,
							S.icon_small,
							S[`icon_small_${icon}`],
							xpCost && cardType && xpCost.level > 0
								? S.icon_small_withXP
								: S.icon_small_noXP,
						)}
					>
						<div className={S.iconSelect} onClick={selectPreviewIcon} />
						<CircleIcon
							icon={previewIcon}
							className={S.iconItem}
							containerClassName={S.iconContainer}
							scaleFactor={{
								circled: 0.97,
								all: 0.99,
							}}
						/>
					</div>
				)}
				{xpCost && cardType && (
					<div className={S.xpCost}>
						<ClassicDividerIconXPCost type={cardType} xpCost={xpCost} />
					</div>
				)}
				{displaySideXP && xpCost && (
					<div className={S.sideXP}>
						<ClassicDividerSideXP numeric={displayNumericXP} xpCost={xpCost} />
					</div>
				)}

				{children}

				<NotExportable>
					<DividerMenu id={id} className={S.menu} />
				</NotExportable>

				<ClassicDividerStatus
					className={S.status}
					size={size}
					campaignIcon={campaignIcon}
				/>
				{cornerRadius && (
					<NotExportable>
						<DividerCornerRadius
							className={classNames(
								S.cornerRadius,
								props.cornerRadiusClassName,
							)}
						/>
					</NotExportable>
				)}
			</DividerContent>
		</div>
	);
};
