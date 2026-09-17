import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { Icon } from "@/modules/core/icon/shared/ui";
import { useDividerCardsCount } from "@/modules/divider/entities/lib";
import { selectShowDividerCampaignIcon } from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { BoxInput, Row, type RowProps } from "@/shared/ui";
import type { ArkhamDecoDividerProps } from "../../model";
import { useArkhamDecoDividerContext } from "../ArkhamDecoDividerContext";
import * as S from "./ArkhamDecoDividerCardsCount.styles";

type ArkhamDecoDividerCardsCountProps = Omit<RowProps, "divider"> & {
	divider: ArkhamDecoDividerProps;
};

export function ArkhamDecoDividerCardsCount({
	divider,
	onClick,
	...props
}: ArkhamDecoDividerCardsCountProps) {
	const { sxOptions } = useArkhamDecoDividerContext();

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

	const getPrintSx = usePrintSx(sxOptions);

	const textSx = getPrintSx(S.getTextSx);
	const iconSx = getPrintSx(S.getIconSx);
	const totalIconSx = getPrintSx(S.getTotalIconSx);
	const clearSx = getPrintSx(S.getClearSx);
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
