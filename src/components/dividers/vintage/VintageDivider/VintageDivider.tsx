import {
	ClassicDividerSideXP,
	DividerContent,
	DividerText,
	Guides,
	Icon,
	NotExportable,
} from "@/components";
import { DividerType } from "@/shared/model/types/dividers";
import S from "./VintageDivider.module.scss";
import bodyBackground from "./images/body.png";
import iconBackground from "./images/icon-background.png";
import tabBackground from "./images/tab.png";

import { CircleIcon } from "@/components/ui/icons/CircleIcon/CircleIcon";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useIconSelect } from "@/shared/lib/hooks/useIconSelect";
import { useStoryTranslation } from "@/shared/lib/hooks/useStoryTranslation";
import { selectDividers } from "@/shared/lib/store/features/dividers/dividers";
import { moveTab } from "@/shared/lib/store/features/dividers/vintage/vintage";
import { selectLanguage } from "@/shared/lib/store/features/language/language";
import { selectLayout } from "@/shared/lib/store/features/layout/layout";
import {
	selectBleed,
	selectCornerRadius,
} from "@/shared/lib/store/features/print/print";
import classNames from "classnames";
import { propEq } from "ramda";
import { ClassicDividerEventXPCost } from "../../classic/xp/ClassicDividerIconXPCost/ClassicDividerIconXPCost";
import type { DividerProps } from "../../common/Divider/Divider";
import { VintageDividerCornerRadius as CornerRadius } from "../VintageDividerCornerRadius/VintageDividerCornerRadius";
import { VintageDividerTabCornerRadius as TabCornerRadius } from "../VintageDividerTabCornerRadius/VintageDividerTabCornerRadius";
import { getBottomTitle } from "./features/getBottomTitle";
import { getDefaultIcon } from "./features/getDefaultIcon";
import { getInvestigatorLetter } from "./features/getInvestigatorLetter";
import { getTabColor } from "./features/getTabColor";
import { getTopTitle } from "./features/getTopTitle";
import {
	getNextTabPosition,
	getPrevTabPosition,
	getTabPosition,
} from "./features/tabPosition";

export type VintageDividerProps = DividerProps;

export const VintageDivider = (props: VintageDividerProps) => {
	const { id, backId, xpCost, displayNumericXP = false, type } = props;

	const dispatch = useAppDispatch();
	const { customParams = {} } = useAppSelector(selectLayout);
	const { size = "medium" } = customParams;
	const isLarge = size === "large";
	// const currentPosition = tabPositions[backId || id];

	const { t } = useStoryTranslation(props.story);
	const language = useAppSelector(selectLanguage);
	const bleed = useAppSelector(selectBleed);
	const dividers = useAppSelector(selectDividers);
	const cornerRadius = useAppSelector(selectCornerRadius);

	const tabProps = backId ? dividers.find(propEq(backId, "id")) : props;
	const currentPosition = tabProps?.customParams?.tabPosition;

	const defaultIcon = getDefaultIcon({
		divider: props,
		language,
	});

	const [icon, selectIcon] = useIconSelect({
		defaultIcon,
	});

	const color = getTabColor(props);

	const tabPosition = getTabPosition({
		currentPosition,
		current: props,
		dividers,
	});

	const topTitle = getTopTitle({
		divider: props,
		translate: t,
	});

	const bottomTitle = getBottomTitle({
		divider: props,
		translate: t,
	});

	const isInvestigator = type === DividerType.INVESTIGATOR;

	const moveRight = () =>
		dispatch(moveTab(id, getNextTabPosition(tabPosition)));

	const moveLeft = () => dispatch(moveTab(id, getPrevTabPosition(tabPosition)));

	return (
		<div
			className={classNames(
				S.container,
				S[language],
				S[tabPosition],
				S[size],
				bleed && S.bleed,
			)}
			data-position={tabPosition}
		>
			<DividerContent className={S.content}>
				{xpCost && (
					<div className={S.sideXPCost}>
						<ClassicDividerSideXP xpCost={xpCost} numeric={displayNumericXP} />
					</div>
				)}
				<div className={S.topTitle}>
					<DividerText
						defaultValue={topTitle}
						className={S.topTitleText}
						inputClassName={S.topTitleInput}
						fixedFontSize={false}
					/>
				</div>
				<div className={S.bottomTitle}>
					<DividerText
						defaultValue={bottomTitle}
						className={S.bottomTitleText}
						inputClassName={S.bottomTitleInput}
						wrapperClassName={S.bottomTitleWrapper}
						fixedFontSize={false}
						fullHeight={false}
					/>
				</div>

				<div className={classNames(S.tab, S[`tab_${tabPosition}`])}>
					<NotExportable>
						{cornerRadius && <TabCornerRadius />}
						{tabPosition !== "left" && !backId && (
							<div
								className={classNames(S.moveTab, S.moveTab_left)}
								onClick={moveLeft}
							>
								<Icon icon="action" className={S.moveIcon} />
							</div>
						)}
						{tabPosition !== "right" && !backId && (
							<div
								className={classNames(S.moveTab, S.moveTab_right)}
								onClick={moveRight}
							>
								<Icon icon="action" />
							</div>
						)}
					</NotExportable>
					{xpCost && (
						<div className={S.xpCost}>
							<ClassicDividerEventXPCost xpCost={xpCost} />
						</div>
					)}
					<div className={S.tabOverlay} style={{ background: color }} />
					<img src={tabBackground} alt="" className={S.tabImage} />
					<img src={iconBackground} alt="" className={S.iconBackground} />
					<div
						className={classNames(
							S.icon,
							xpCost && xpCost?.level > 0 && S.icon_xp,
						)}
					>
						{icon && (
							<div className={S.iconWrapper} onClick={selectIcon}>
								<CircleIcon
									type="vintage"
									icon={icon}
									scaleFactor={{
										regular: 0.87,
										circled: icon.startsWith("return_") ? 1.03 : 0.87,
									}}
								/>
							</div>
						)}
						{isInvestigator && !icon && (
							<div className={S.letterIcon}>
								<DividerText
									defaultValue={getInvestigatorLetter(topTitle)}
									clearPosition="outside"
									fixedFontSize={false}
								/>
							</div>
						)}
					</div>
				</div>
				{bleed && <div className={S.bodyBleed} />}
				{isLarge && <div className={S.bottomBacground} />}
				<NotExportable>
					{tabPosition !== "left" && (
						<Guides
							className={classNames(S.tabGuides, S.tabGuides_left)}
							topLeft={false}
							topRight="inset-corner-tr"
							bottomLeft="inset-corner-bl"
							bottomRight="inset-corner-br"
						/>
					)}
					{tabPosition !== "right" && (
						<Guides
							className={classNames(S.tabGuides, S.tabGuides_right)}
							topLeft="inset-corner-tl"
							topRight={false}
							bottomLeft="inset-corner-bl"
							bottomRight="inset-corner-br"
						/>
					)}
				</NotExportable>
				<img src={bodyBackground} alt="" className={S.body} />
				{cornerRadius && (
					<NotExportable>
						<CornerRadius
							className={S.cornerRadius}
							$tabPosition={tabPosition}
						/>
					</NotExportable>
				)}
			</DividerContent>
		</div>
	);
};
