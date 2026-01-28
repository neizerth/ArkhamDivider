import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import type { SxProps } from "@mui/material/styles";
import { QRCodeSVG } from "qrcode.react";
import { Trans } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { fromPx } from "@/modules/print/shared/lib";
import { Row } from "@/shared/ui";

type AuthorCreditsProps = BoxProps & {
	contactUrl?: string;
	authorName: string;
	donationUrl: string;
	mmSize: number;
};

export function AuthorCredits({
	donationUrl,
	contactUrl,
	authorName,
	mmSize,
	...props
}: AuthorCreditsProps) {
	const mm = fromPx(mmSize);
	const linkSx: SxProps = {
		color: "inherit",
		textDecoration: "underline",
		whiteSpace: "nowrap",
		":hover": {
			textDecoration: "none",
		},
	};
	return (
		<Box {...props}>
			<Row gap={mm(4)} alignItems="center">
				<Link
					href={donationUrl}
					target="_blank"
					sx={{
						":hover": { opacity: 0.6 },
					}}
				>
					<QRCodeSVG value={donationUrl} width={mm(20)} height={mm(20)} />
				</Link>
				<Box fontSize={mm(3)}>
					<Trans
						i18nKey="credits.author.description"
						values={{
							donationUrl,
							name: authorName,
						}}
						components={{
							icon: <Icon icon="free" sx={{ fontSize: mm(2) }} />,
							author: contactUrl ? (
								<Link href={contactUrl} sx={linkSx} target="_blank" />
							) : (
								<span />
							),
							donationLink: (
								<Link href={donationUrl} sx={linkSx} target="_blank" />
							),
						}}
					/>
				</Box>
			</Row>
		</Box>
	);
}
