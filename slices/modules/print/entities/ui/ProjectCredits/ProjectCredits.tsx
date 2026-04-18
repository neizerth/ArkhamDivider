import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import type { SxProps } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { creditsParams } from "@/modules/print/shared/config";
import { fromPx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { QR, Row } from "@/shared/ui";
import { localeData } from "./config";

type ProjectCreditsProps = BoxProps & {
	mmSize: number;
};

export function ProjectCredits({ mmSize, ...props }: ProjectCreditsProps) {
	const language = useAppSelector(selectCurrentLanguage);
	const { t } = useTranslation();
	const { url, platform } = localeData[language] ?? localeData.en;
	const mm = fromPx(mmSize);
	const qrSize = Math.round(creditsParams.qrDisplaySize * mmSize);

	const linkSx: SxProps = {
		color: "inherit",
		textDecoration: "underline",
		":hover": {
			textDecoration: "none",
		},
	};

	return (
		<Box {...props}>
			<Row
				gap={mm(creditsParams.rowGap)}
				alignItems="center"
				fontFamily="Arno Pro, serif"
			>
				<Box fontSize={mm(creditsParams.textFontSize)}>
					<Box textAlign="right">
						{t("Support project on {{platform}}", { platform })}
					</Box>
					<Link href={url} target="_blank" sx={linkSx}>
						{url}
					</Link>
				</Box>
				<Link
					href={url}
					target="_blank"
					sx={{
						":hover": { opacity: 0.6 },
					}}
				>
					<QR url={url} size={qrSize} />
				</Link>
			</Row>
		</Box>
	);
}
