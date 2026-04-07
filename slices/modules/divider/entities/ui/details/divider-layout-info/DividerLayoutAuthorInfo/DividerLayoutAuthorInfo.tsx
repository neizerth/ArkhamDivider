import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useDonationUrl } from "@/entities/common/lib";
import { Icon } from "@/modules/core/icon/shared/ui";
import type { Author } from "@/shared/model";
import { Image, Row, TextLink } from "@/shared/ui";

type DividerLayoutAuthorInfoProps = {
	author: Author;
};

export function DividerLayoutAuthorInfo({
	author,
}: DividerLayoutAuthorInfoProps) {
	const { contacts } = author;
	const { t } = useTranslation();
	const donationUrl = useDonationUrl(author.donationUrl);

	const paddingBottom = donationUrl ? 0 : 2;
	return (
		<Stack gap={2} paddingBottom={paddingBottom} alignItems="flex-start">
			<Row
				gap={2}
				sx={{
					justifyContent: { xs: "center", sm: "flex-start" },
				}}
			>
				{author.image && (
					<Image
						src={author.image}
						width={60}
						height={60}
						alt={author.name}
						sx={{
							objectFit: "contain",
						}}
					/>
				)}
				<Stack gap={1}>
					<Typography variant="h6">{author.name}</Typography>
					{contacts && (
						<Row gap={2} alignItems="center">
							{contacts.map((contact) => (
								<TextLink
									key={contact.id}
									href={contact.url}
									title={contact.title}
									target="_blank"
									rel="noopener noreferrer"
									display="inline-flex"
								>
									<Icon icon={contact.icon} />
								</TextLink>
							))}
						</Row>
					)}
				</Stack>
			</Row>

			{donationUrl && (
				<Button
					sx={{
						maxWidth: "340px",
						alignSelf: {
							xs: "center",
							sm: "flex-start",
						},
					}}
					href={donationUrl}
					target="_blank"
					rel="noopener noreferrer"
					size="small"
					variant="contained"
					color="primary"
					fullWidth
				>
					{t`Support the author`}
				</Button>
			)}
		</Stack>
	);
}
