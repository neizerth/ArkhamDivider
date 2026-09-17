import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { Icon } from "@/modules/core/icon/shared/ui";
import { useDividerCardsCount } from "@/modules/divider/entities/lib";
import { selectShowDividerCampaignIcon } from "@/modules/divider/shared/lib";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { BoxInput, Row, type RowProps } from "@/shared/ui";
import * as S from "./ClassicDividerStats.styles";

type ClassicDividerStatsProps = Omit<RowProps, "divider"> & {
	divider: DividerWithRelations;
};

export function ClassicDividerStats({
	divider,
	onClick,
	...props
}: ClassicDividerStatsProps) {
	const showCampaignIcon = useAppSelector(
		selectShowDividerCampaignIcon(divider.id),
	);
	const {
		showCardsCount,
		cardsCount,
		defaultCardsCount,
		onValueChange,
		onCommit,
	} = useDividerCardsCount({ divider });

	const getPrintSx = usePrintSx();

	const textSx = getPrintSx(S.getTextSx);
	const totalIconSx = getPrintSx(S.getTotalIconSx);
	const clearSx = getPrintSx(S.getClearSx);
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

	return (
		<Row {...props} sx={sxProp}>
			{showCampaignIcon ? (
				<Icon icon={icon} sx={iconSx} />
			) : (
				showCardsCount && <Box sx={totalIconSx}>∑</Box>
			)}
			{showCardsCount && (
				<BoxInput
					sx={textSx}
					value={cardsCount.toString()}
					defaultValue={defaultCardsCount.toString()}
					clearable
					clearProps={{ sx: clearSx }}
					onClick={onClick}
					onValueChange={onValueChange}
					onBlur={onCommit}
				/>
			)}
		</Row>
	);
}
