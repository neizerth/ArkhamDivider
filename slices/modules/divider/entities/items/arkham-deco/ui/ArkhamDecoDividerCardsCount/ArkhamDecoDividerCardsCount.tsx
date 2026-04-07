import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { Icon } from "@/modules/core/icon/shared/ui";
import { getDividerCardsCount } from "@/modules/divider/entities/lib/logic";
import { selectShowCampaignIcon } from "@/modules/divider/shared/lib";
import { selectShowCardsCount } from "@/modules/divider/shared/lib/store/selectors/selectShowCardsCount";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Row, type RowProps } from "@/shared/ui";
import type { ArkhamDecoDividerProps } from "../../model";
import { useArkhamDecoDividerContext } from "../ArkhamDecoDividerContext";
import * as S from "./ArkhamDecoDividerCardsCount.styles";

type ArkhamDecoDividerCardsCountProps = Omit<RowProps, "divider"> & {
	divider: ArkhamDecoDividerProps;
};

export function ArkhamDecoDividerCardsCount({
	divider,
	...props
}: ArkhamDecoDividerCardsCountProps) {
	const { sxOptions } = useArkhamDecoDividerContext();

	const showCampaignIcon = useAppSelector(selectShowCampaignIcon);
	const showCardsCount = useAppSelector((state) =>
		selectShowCardsCount(state, divider.id),
	);

	const getPrintSx = usePrintUnit(sxOptions);

	const textSx = getPrintSx(S.getTextSx);
	const iconSx = getPrintSx(S.getIconSx);
	const totalIconSx = getPrintSx(S.getTotalIconSx);
	const rowSx = getPrintSx(S.getRowSx);

	if (!divider.story?.icon) {
		return null;
	}

	const { icon } = divider.story;
	if (!icon) {
		return null;
	}

	const sxProp = {
		...rowSx,
		...props.sx,
	} as SxProps;

	const cardsCount = getDividerCardsCount(divider);

	return (
		<Row {...props} sx={sxProp}>
			{showCampaignIcon ? (
				<Icon icon={icon} sx={iconSx} />
			) : (
				showCardsCount && <Box sx={totalIconSx}>∑</Box>
			)}
			{showCardsCount && <Box sx={textSx}>{cardsCount}</Box>}
		</Row>
	);
}
