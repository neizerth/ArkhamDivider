import { Tooltip } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { useDividerCardsCount } from "@/modules/divider/entities/lib";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import {
	selectScenarioParams,
	useLayoutParam,
} from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { BoxInput, Row, type RowProps } from "@/shared/ui";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import * as S from "./ArkhamIndexDividerCardsCount.styles";

export type ArkhamIndexDividerCardsCountProps = RowProps & {
	onToggle?: () => void;
};

export function ArkhamIndexDividerCardsCount({
	onToggle,
	...props
}: ArkhamIndexDividerCardsCountProps) {
	const { t } = useTranslation();
	const { divider, sxOptions } = useArkhamIndexContext();

	const { backSideShift = false } = sxOptions;

	const {
		showCardsCount,
		cardsCount,
		defaultCardsCount,
		onValueChange,
		onCommit,
	} = useDividerCardsCount({ divider });

	const { campaignIcon: showCampaignIcon } =
		useAppSelector(selectScenarioParams);

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
	const clearSx = getPrintSx(S.getClearSx);
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
						<BoxInput
							sx={cardsCountSx}
							value={cardsCount.toString()}
							defaultValue={defaultCardsCount.toString()}
							clearable
							clearProps={{ sx: clearSx }}
							onClick={onToggle}
							onValueChange={onValueChange}
							onBlur={onCommit}
						/>
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
