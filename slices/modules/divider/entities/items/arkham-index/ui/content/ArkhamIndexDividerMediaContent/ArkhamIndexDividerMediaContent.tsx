import { Box, type BoxProps, IconButton } from "@mui/material";
import { Icon } from "@/modules/core/icon/shared/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { Image, Row, Upload } from "@/shared/ui";
import { useArkhamIndexImage } from "../../../lib";
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
	const imageSx = getPrintSx(S.getImageSx);
	const coversCountSx = getPrintSx(S.getCoversCountSx);
	const iconSx = getPrintSx(S.getIconSx);
	const uploadSx = getPrintSx(S.getUploadSx);

	const {
		url,
		coversCount,
		customImage,
		revokeCustomImage,
		upload,
		next,
		prev,
	} = useArkhamIndexImage();

	return (
		<Box {...props}>
			<ArkhamIndexDividerTitle sx={titleSx} />
			<Box sx={topLineSx} />
			{url && (
				<Box sx={imageSx}>
					<Image
						src={url}
						sx={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "center",
						}}
						crossOrigin="anonymous"
					/>
					<NotExportable>
						<Row sx={uploadSx}>
							{customImage && (
								<IconButton onClick={revokeCustomImage}>
									<Icon icon="trash" sx={iconSx} />
								</IconButton>
							)}
							<Upload accept="image/*" onChange={upload}>
								<Icon icon="image" sx={iconSx} />
							</Upload>
						</Row>
					</NotExportable>
					{coversCount > 1 && (
						<NotExportable>
							<Row sx={coversCountSx}>
								<IconButton onClick={prev}>
									<Icon icon="arrow-left" sx={iconSx} />
								</IconButton>
								<IconButton onClick={next}>
									<Icon icon="arrow-right" sx={iconSx} />
								</IconButton>
							</Row>
						</NotExportable>
					)}
				</Box>
			)}
			<Box sx={bottomLineSx} />
		</Box>
	);
}
