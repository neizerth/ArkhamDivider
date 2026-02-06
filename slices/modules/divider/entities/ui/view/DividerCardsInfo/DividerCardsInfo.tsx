import Box from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { getDividerCards, getDividerCardsCount } from "../../../lib/logic";
import { getSx } from "./DividerCardsInfo.styles";

type DividerCardsInfoProps<T> = Omit<StackProps, "divider"> & {
	divider: DividerWithRelations<T>;
};

export function DividerCardsInfo<T = void>({
	divider,
	...props
}: DividerCardsInfoProps<T>) {
	const { t } = useTranslation();
	const getPrintSx = usePrintUnit();
	const containerSx = getPrintSx(getSx);
	const cards = getDividerCards(divider);
	const cardsCount = getDividerCardsCount(divider);

	const sx: SxProps = {
		...containerSx,
		...props.sx,
	} as SxProps;

	return (
		<Stack {...props} sx={sx} displayPrint="none">
			<Box display="flex" flexWrap="wrap" gap={2}>
				{cards.map((card, index) => (
					<Box key={card.type} display="inline-block">
						<i>{t(`card.type.${card.type}`)}</i> ({card.size})
						<i>{index < cards.length - 1 && ", "}</i>
					</Box>
				))}
			</Box>
			<Box>
				<b>
					{t`cards.total`}: {cardsCount}
				</b>
			</Box>
		</Stack>
	);
}
