import S from "./ArkhamesqueClassicDivider.module.scss";
import classNames from "classnames";
import { DividerContent } from "../../common/DividerContent/DividerContent";
import { useStoryTranslation } from "@/shared/lib/hooks/useStoryTranslation";
import { useIconSelect } from "@/shared/lib/hooks/useIconSelect";
import { useEffect, useLayoutEffect, useState } from "react";
import { getDividerData } from "./data/getDividerData";
import { useSelector } from "react-redux";
import { selectArkhamesqueData } from "@/shared/lib/store/features/dividers/arkhamesque/arkhamesque";
import { DividerText } from "../../common/DividerText/DividerText";
import { NotExportable } from "@/components/ui/behavior/NotExportable/NotExportable";
import { DividerMenu } from "../../common/DividerMenu/DividerMenu";
import { selectLanguage } from "@/shared/lib/store/features/language/language";
import { TextFit } from "@/components/ui/behavior/TextFit/TextFit";
import { XPCost } from "@/shared/model/types/game";
import { ArkhamesqueClassicDividerPlayerXPCostTitle as XPCostTitle } from "../ArkhamesqueClassicDividerPlayerXPCostTitle/ArkhamesqueClassicDividerPlayerXPCostTitle";
import type { DividerProps } from "../../common/Divider/Divider";
import { ArkhamesqueClassicDividerCanvasMemo as Canvas } from "../ArkhamesqueClassicDividerCanvas/ArkhamesqueClassicDividerCanvas";
import {
	addLoadIndex,
	removeDivider,
	selectLoadIndex,
	setNextLoadIndex,
} from "@/shared/lib/store/features/dividers/dividers";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Icon } from "@/components/ui/icons/Icon/Icon";
import { delay } from "@/shared/lib/features/util/common";
import { DividerCornerRadius } from "../../common/DividerCornerRadius/DividerCornerRadius";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectCornerRadius } from "@/shared/lib/store/features/print/print";

export type ArkhamesqueClassicDividerProps = DividerProps;

export const ArkhamesqueClassicDivider = (
	props: ArkhamesqueClassicDividerProps,
) => {
	const { id, story, name = "", type, xpCost } = props;

	const dispatch = useAppDispatch();
	const language = useSelector(selectLanguage);
	const data = useSelector(selectArkhamesqueData);
	const loadIndex = useSelector(selectLoadIndex);
	const cornerRadius = useAppSelector(selectCornerRadius);

	const { t } = useStoryTranslation(story);

	const translatedName = t(name);
	const realLanguage = translatedName === name ? "en" : language;

	const [_, setTitle] = useState(translatedName);

	const mapDefaultIcon = (icon?: string) =>
		icon === "multiclass" ? "multiclass_arkhamesque" : icon;

	const [icon, selectIcon] = useIconSelect({
		defaultIcon: mapDefaultIcon(props.icon),
	});

	const [specialIcon, selectSpecialIcon] = useIconSelect({
		defaultIcon: mapDefaultIcon(
			props.campaignIcon || props.specialIcon || props.icon,
		),
	});

	const [isRendered, setIsRendered] = useState(false);

	const isLoading = id === loadIndex;

	useLayoutEffect(() => {
		setIsRendered(false);
	}, [specialIcon, icon, dispatch]);

	useEffect(() => {
		if (isRendered) {
			return;
		}
		dispatch(addLoadIndex(id));
	}, [isRendered, id, dispatch]);

	const onRender = async () => {
		setIsRendered(true);
		// console.log('render!', index, loadIndex, isRendered)
		if (isLoading) {
			await delay(100);
			dispatch(setNextLoadIndex());
		}
	};

	const item =
		data &&
		getDividerData({
			data,
			divider: props,
		});

	useEffect(() => {
		if (!item?.image) {
			dispatch(removeDivider(id));
		}
	}, [item, id, dispatch]);

	const titleInputClassName = classNames(S.titleInput);

	const scenarioNumber =
		item?.scenario?.number_text || props.scenario?.number_text;
	const showPreviewIcon = item?.icon !== false && item?.previewIcon !== false;
	const showSpecialIcon = item?.icon !== false;
	const showXP = item?.xp !== false;

	const showCanvas = isLoading || isRendered;

	return (
		<div
			className={classNames(S.container, S[type], S[realLanguage])}
			data-scenario-id={props.scenario?.id}
			data-icon={icon}
			data-special-icon={specialIcon}
		>
			<DividerContent className={S.dividerContent}>
				{item && (
					<>
						{!isRendered && (
							<div className={classNames(S.loader, isRendered && S.loaded)}>
								<Icon icon={isLoading ? "action" : "hour-glass"} />
							</div>
						)}
						{isRendered && (
							<div className={S.renderContent}>
								{item.scenario && scenarioNumber && (
									<div className={S.specialText}>
										<TextFit
											text={scenarioNumber}
											className={S.specialTextContainer}
										/>
									</div>
								)}
								{xpCost && xpCost?.level !== XPCost.NO_COST && showXP && (
									<div className={S.specialText}>
										<XPCostTitle xpCost={xpCost} />
									</div>
								)}
								<div className={classNames(S.title, S[type])}>
									<DividerText
										defaultValue={translatedName}
										className={S.titleControl}
										inputClassName={titleInputClassName}
										onChange={setTitle}
										fixedFontSize={false}
									/>
								</div>
								{showPreviewIcon && (
									<div className={S.previewHandler} onClick={selectIcon} />
								)}
								{showSpecialIcon && (
									<div
										className={S.specialHandler}
										onClick={selectSpecialIcon}
									/>
								)}

								<NotExportable>
									<DividerMenu id={id} className={S.menu} />
								</NotExportable>
							</div>
						)}

						{showCanvas && (
							<Canvas
								className={S.canvas}
								image={item.image}
								previewIcon={showPreviewIcon && icon}
								specialIcon={showSpecialIcon && specialIcon}
								onRender={onRender}
							/>
						)}
					</>
				)}
				{cornerRadius && (
					<NotExportable>
						<DividerCornerRadius className={S.cornerRadius} />
					</NotExportable>
				)}
			</DividerContent>
		</div>
	);
};
