import { Box } from "@mui/material";
import { getDividerCardsCount } from "@/modules/divider/entities/lib";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import {
	selectScenarioParams,
	selectShowCardsCount,
} from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Row, type RowProps } from "@/shared/ui";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import * as S from "./ArkhamIndexDividerCardsCount.styles";

export type ArkhamIndexDividerCardsCountProps = RowProps;

export function ArkhamIndexDividerCardsCount(
	props: ArkhamIndexDividerCardsCountProps,
) {
	const { divider, sxOptions } = useArkhamIndexContext();

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

	return (
		<Row {...props}>
			{showCardsCount && <Box sx={cardsCountSx}>{cardsCount}</Box>}
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
	);
}
