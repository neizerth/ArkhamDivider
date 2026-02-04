import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import type { SxProps } from "@mui/material/styles";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { fromPx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import { localeData } from "./config";

type ProjectCreditsProps = BoxProps & {
	mmSize: number;
};

export function ProjectCredits({ mmSize, ...props }: ProjectCreditsProps) {
	const language = useAppSelector(selectCurrentLanguage);
	const { t } = useTranslation();
	const { url, platform } = localeData[language] ?? localeData.en;
	const mm = fromPx(mmSize);

	const linkSx: SxProps = {
		color: "inherit",
		textDecoration: "underline",
		":hover": {
			textDecoration: "none",
		},
	};

	return (
		<Box {...props}>
			<Row gap={mm(4)} alignItems="center" fontFamily="Arno Pro, serif">
				<Box fontSize={mm(3)}>
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
					<QRCodeSVG value={url} width={mm(20)} height={mm(20)} />
				</Link>
			</Row>
		</Box>
	);
}
