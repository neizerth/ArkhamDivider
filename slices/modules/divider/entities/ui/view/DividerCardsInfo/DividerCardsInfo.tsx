import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { usePrintSx } from "@/modules/print/shared/lib";
import { getDividerCards, getDividerCardsCount } from "../../../lib/logic";
import { getSx } from "./DividerCardsInfo.styles";

type DividerCardsInfoProps = BoxProps & {
	divider: DividerWithRelations;
};

export function DividerCardsInfo({ divider, ...props }: DividerCardsInfoProps) {
	const { t } = useTranslation();
	const containerSx = usePrintSx(getSx);
	const cards = getDividerCards(divider);
	const cardsCount = getDividerCardsCount(divider);

	const sx: SxProps = {
		...containerSx,
		...props.sx,
	} as SxProps;

	return (
		<Box {...props} sx={sx}>
			<Box display="flex" flexWrap="wrap" gap={1}>
				{cards.map((card, index) => (
					<Box key={card.type} display="inline-block">
						<i>{t(`card.type.${card.type}`)}</i> ({card.size})
						{index < cards.length - 1 && ", "}
					</Box>
				))}
			</Box>
			<b>
				{t`cards.total`}: {cardsCount}
			</b>
		</Box>
	);
}
