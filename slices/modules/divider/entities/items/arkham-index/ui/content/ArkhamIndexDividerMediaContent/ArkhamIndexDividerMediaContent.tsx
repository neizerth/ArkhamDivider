import { Box, type BoxProps, IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();
	const { sxOptions, layout } = useArkhamIndexContext();

	const { orientation } = layout;

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
							<Tooltip
								arrow
								title={t(
									`mui divider.arkham-index.customImage.${orientation}.size`,
								)}
							>
								<Upload accept="image/*" onChange={upload}>
									<Icon icon="image" sx={iconSx} />
								</Upload>
							</Tooltip>
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
