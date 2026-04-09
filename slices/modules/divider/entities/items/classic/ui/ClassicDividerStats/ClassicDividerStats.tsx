import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { Icon } from "@/modules/core/icon/shared/ui";
import { getDividerCardsCount } from "@/modules/divider/entities/lib/logic";
import { selectShowCampaignIcon } from "@/modules/divider/shared/lib";
import { selectShowCardsCount } from "@/modules/divider/shared/lib/store/selectors/selectShowCardsCount";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Row, type RowProps } from "@/shared/ui";
import * as S from "./ClassicDividerStats.styles";

type ClassicDividerStatsProps = Omit<RowProps, "divider"> & {
	divider: DividerWithRelations;
};

export function ClassicDividerStats({
	divider,
	...props
}: ClassicDividerStatsProps) {
	const showCampaignIcon = useAppSelector(selectShowCampaignIcon);
	const showCardsCount = useAppSelector((state) =>
		selectShowCardsCount(state, divider.id),
	);

	const getPrintSx = usePrintSx();

	const textSx = getPrintSx(S.getTextSx);
	const totalIconSx = getPrintSx(S.getTotalIconSx);
	const sx = getPrintSx(S.getSx);
	const iconSx = getPrintSx(S.getIconSx);

	if (!divider.story?.icon) {
		return null;
	}

	const { icon } = divider.story;
	if (!icon) {
		return null;
	}

	const sxProp = {
		...sx,
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
