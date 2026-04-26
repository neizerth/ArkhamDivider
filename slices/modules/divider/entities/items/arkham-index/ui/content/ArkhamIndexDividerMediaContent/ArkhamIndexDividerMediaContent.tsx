import { Box, type BoxProps } from "@mui/material";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import { ArkhamIndexDividerTitle } from "../ArkhamIndexDividerTitle";
import * as S from "./ArkhamIndexDividerMediaContent.styles";

type ArkhamIndexDividerMediaContentProps = BoxProps;

export function ArkhamIndexDividerMediaContent(
	props: ArkhamIndexDividerMediaContentProps,
) {
	const { sxOptions } = useArkhamIndexContext();
	const getPrintSx = usePrintSx(sxOptions);
	const titleSx = getPrintSx(S.getTitleSx);
	const topLineSx = getPrintSx(S.getTopLineSx);
	const bottomLineSx = getPrintSx(S.getBottomLineSx);

	return (
		<Box {...props}>
			<ArkhamIndexDividerTitle sx={titleSx} />
			<Box sx={topLineSx} />
			<Box sx={bottomLineSx} />
		</Box>
	);
}
