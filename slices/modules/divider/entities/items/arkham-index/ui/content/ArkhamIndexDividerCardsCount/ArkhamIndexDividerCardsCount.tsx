import { Box, Tooltip } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { getDividerCardsCount } from "@/modules/divider/entities/lib";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import {
	selectScenarioParams,
	selectShowCardsCount,
	useLayoutParam,
} from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { Row, type RowProps } from "@/shared/ui";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import * as S from "./ArkhamIndexDividerCardsCount.styles";

export type ArkhamIndexDividerCardsCountProps = RowProps & {
	onСardCountClick?: () => void;
};

export function ArkhamIndexDividerCardsCount({
	onСardCountClick,
	...props
}: ArkhamIndexDividerCardsCountProps) {
	const { t } = useTranslation();
	const { divider, sxOptions } = useArkhamIndexContext();

	const { backSideShift = false } = sxOptions;

	const showCardsCount = useAppSelector((state) =>
		selectShowCardsCount(state, divider.id),
	);

	const { campaignIcon: showCampaignIcon } =
		useAppSelector(selectScenarioParams);

	const cardsCount = getDividerCardsCount(divider);

	const getDividerIcon = useDividerIcon({ dividerId: divider.id });

	const investigator =
		divider.type === "investigator" ? divider.investigator : null;

	const defaultCampaignIcon = investigator?.icon ?? divider.story?.icon;

	const [campaignIcon, selectCampaignIcon] = getDividerIcon({
		param: "campaignIcon",
		defaultIcon: defaultCampaignIcon,
	});

	const getPrintSx = usePrintSx(sxOptions);
	const cardsCountSx = getPrintSx(S.getCardsCountSx);
	const campaignIconSx = getPrintSx(S.getCampaignIconSx);
	const contentSx = getPrintSx(S.getContentSx);
	const containerSx = getPrintSx(S.getContainerSx);
	const arrowSx = getPrintSx(S.getArrowSx);

	const setBackSideShift = useLayoutParam({
		key: "backSideShift",
	});

	const toggleBackSideShift = useCallback(() => {
		setBackSideShift(!backSideShift);
	}, [setBackSideShift, backSideShift]);

	const isBackSide = divider.side === "back";

	const sx = {
		...props.sx,
		...containerSx,
	};

	return (
		<Row {...props} sx={sx}>
			<Row sx={contentSx}>
				{isBackSide && (
					<NotExportable>
						<Tooltip
							title={t("divider.layout.arkham-index.sideShift")}
							placement="top"
							slotProps={{
								tooltip: {
									sx: {
										maxWidth: 320,
										fontSize: "0.875rem",
										padding: 1.5,
									},
								},
							}}
						>
							<Icon
								icon="left-arrow"
								sx={arrowSx}
								onClick={toggleBackSideShift}
								displayPrint="none"
							/>
						</Tooltip>
					</NotExportable>
				)}
				<Row sx={cardsCountSx}>
					{showCardsCount && (
						<Box sx={cardsCountSx} onClick={onСardCountClick}>
							{cardsCount}
						</Box>
					)}
					{showCampaignIcon && (
						<DividerIcon
							dividerId={divider.id}
							icon={campaignIcon}
							sx={campaignIconSx}
							visible
							onClick={selectCampaignIcon}
						/>
					)}
				</Row>
			</Row>
		</Row>
	);
}
