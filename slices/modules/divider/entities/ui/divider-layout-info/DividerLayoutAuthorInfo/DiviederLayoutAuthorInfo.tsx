import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Icon } from "@/modules/core/icon/shared/ui";
import type { Author } from "@/shared/model";
import { Row, TextLink } from "@/shared/ui";

type DividerLayoutAuthorInfoProps = {
	author: Author;
};

export function DividerLayoutAuthorInfo({
	author,
}: DividerLayoutAuthorInfoProps) {
	const { contacts } = author;
	return (
		<Row gap={2} alignItems="center">
			<img src={author.image} height={60} alt={author.name} />
			<Stack gap={1}>
				<Typography variant="h6">{author.name}</Typography>
				{contacts && (
					<Row gap={2}>
						{contacts.map((contact) => (
							<TextLink
								key={contact.id}
								href={contact.url}
								title={contact.title}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon icon={contact.icon} />
							</TextLink>
						))}
					</Row>
				)}
			</Stack>
		</Row>
	);
}
