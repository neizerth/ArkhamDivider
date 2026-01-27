import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { IconCorrection } from "@/modules/core/icon/entities/ui";
import { getDividerCardsCount } from "@/modules/divider/entities/lib/logic";
import { selectShowCampaignIcon } from "@/modules/divider/shared/lib";
import { selectShowCardsCount } from "@/modules/divider/shared/lib/store/selectors/selectShowCardsCount";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { usePrintSx, usePrintUnitCallback } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Row, type RowProps } from "@/shared/ui";
import { getSx, getTextSx } from "./ClassicDivider.styles";

type ClassicDividerStatsProps = Omit<RowProps, "divider"> & {
	divider: DividerWithRelations;
};

export function ClassicDividerStats({
	divider,
	...props
}: ClassicDividerStatsProps) {
	const mm = usePrintUnitCallback();

	const showCampaignIcon = useAppSelector(selectShowCampaignIcon);
	const showCardsCount = useAppSelector((state) =>
		selectShowCardsCount(state, divider.id),
	);

	const textSx = usePrintSx(getTextSx);
	const sx = usePrintSx(getSx);
	if (!divider.story?.icon) {
		return null;
	}

	const { icon } = divider.story;
	if (!icon) {
		return null;
	}

	const gap = mm(showCampaignIcon ? 0.5 : 0.4);

	const sxProp = {
		...sx,
		...props.sx,
		gap: `${gap}px`,
	} as SxProps;

	const cardsCount = getDividerCardsCount(divider);

	return (
		<Row {...props} sx={sxProp}>
			{showCampaignIcon ? (
				<IconCorrection icon={icon} fontSize={mm(3)} />
			) : (
				showCardsCount && "∑"
			)}
			{showCardsCount && <Box sx={textSx}>{cardsCount}</Box>}
		</Row>
	);
}
