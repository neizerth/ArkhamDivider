import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import type { SxProps } from "@mui/material/styles";
import { Trans } from "react-i18next";
import { useDonationUrl } from "@/entities/common/lib";
import { Icon } from "@/modules/core/icon/shared/ui";
import { creditsParams } from "@/modules/print/shared/config";
import { fromPx } from "@/modules/print/shared/lib";
import type { Author } from "@/shared/model";
import { QR, Row } from "@/shared/ui";

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
			<Row
				gap={mm(creditsParams.rowGap)}
				alignItems="center"
				fontFamily="Arno Pro, serif"
				sx={{
					"@media print": {
						gap: `${creditsParams.rowGap}mm`,
					},
				}}
			>
				<Link
					href={url}
					target="_blank"
					sx={{
						":hover": { opacity: 0.6 },
					}}
				>
					<QR url={url} size={creditsParams.qrDisplaySize} mmSize={mmSize} />
				</Link>
				<Box
					fontSize={mm(creditsParams.textFontSize)}
					sx={{
						"@media print": { fontSize: `${creditsParams.textFontSize}mm` },
					}}
				>
					<Trans
						i18nKey="credits.author.description"
						values={{
							donationUrl: url,
							name: author.name,
						}}
						components={{
							icon: (
								<Icon
									icon="free"
									sx={{
										fontSize: mm(2),
										"@media print": { fontSize: "2mm" },
									}}
								/>
							),
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
