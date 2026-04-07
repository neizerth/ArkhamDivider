import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import type { SxProps } from "@mui/material/styles";
import { QRCodeSVG } from "qrcode.react";
import { Trans } from "react-i18next";
import { useDonationUrl } from "@/entities/common/lib";
import { Icon } from "@/modules/core/icon/shared/ui";
import { fromPx } from "@/modules/print/shared/lib";
import type { Author } from "@/shared/model";
import { Row } from "@/shared/ui";

type AuthorCreditsProps = BoxProps & {
	author: Author;
	mmSize: number;
};

export function AuthorCredits({
	author,
	mmSize,
	...props
}: AuthorCreditsProps) {
	const { donationUrl, contactUrl } = author;

	const mm = fromPx(mmSize);
	const linkSx: SxProps = {
		color: "inherit",
		textDecoration: "underline",
		whiteSpace: "nowrap",
		":hover": {
			textDecoration: "none",
		},
	};

	const url = useDonationUrl(donationUrl) as string;

	return (
		<Box {...props}>
			<Row gap={mm(4)} alignItems="center" fontFamily="Arno Pro, serif">
				<Link
					href={url}
					target="_blank"
					sx={{
						":hover": { opacity: 0.6 },
					}}
				>
					<QRCodeSVG value={url} width={mm(20)} height={mm(20)} />
				</Link>
				<Box fontSize={mm(3)}>
					<Trans
						i18nKey="credits.author.description"
						values={{
							donationUrl: url,
							name: author.name,
						}}
						components={{
							icon: <Icon icon="free" sx={{ fontSize: mm(2) }} />,
							author: contactUrl ? (
								<Link href={contactUrl} sx={linkSx} target="_blank" />
							) : (
								<span />
							),
							donationLink: <Link href={url} sx={linkSx} target="_blank" />,
						}}
					/>
				</Box>
			</Row>
		</Box>
	);
}
