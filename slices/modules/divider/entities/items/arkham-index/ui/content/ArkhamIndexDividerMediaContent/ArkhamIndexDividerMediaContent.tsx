import { Box, type BoxProps } from "@mui/material";
import { usePrintSx } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { getArkhamIndexDividerImageUrl } from "../../../api";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import { ArkhamIndexDividerTitle } from "../ArkhamIndexDividerTitle";
import * as S from "./ArkhamIndexDividerMediaContent.styles";

type ArkhamIndexDividerMediaContentProps = BoxProps;

export function ArkhamIndexDividerMediaContent(
	props: ArkhamIndexDividerMediaContentProps,
) {
	const { sxOptions, divider } = useArkhamIndexContext();
	const getPrintSx = usePrintSx(sxOptions);
	const titleSx = getPrintSx(S.getTitleSx);
	const topLineSx = getPrintSx(S.getTopLineSx);
	const bottomLineSx = getPrintSx(S.getBottomLineSx);
	const imageSx = getPrintSx(S.getImageSx);

	const imageUrl = getArkhamIndexDividerImageUrl({ divider });

	return (
		<Box {...props}>
			<ArkhamIndexDividerTitle sx={titleSx} />
			<Box sx={topLineSx} />
			{imageUrl && (
				<Box sx={imageSx}>
					<Image
						src={imageUrl}
						sx={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "center",
						}}
						crossOrigin="anonymous"
					/>
				</Box>
			)}
			<Box sx={bottomLineSx} />
		</Box>
	);
}
