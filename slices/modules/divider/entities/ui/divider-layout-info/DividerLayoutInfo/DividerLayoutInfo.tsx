import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { Row, Separator } from "@/shared/ui";
import { getBoxSize } from "@/shared/util";
import { getLayoutAuthors } from "../../../lib";
import { DividerLayoutAuthorInfo as Author } from "../DividerLayoutAuthorInfo";
import { DividerLayoutSleeveInfo as Sleeve } from "../DividerLayoutSleeveInfo";

type DividerLayoutInfoProps = {
	layout: DividerLayout;
};

export function DividerLayoutInfo({ layout }: DividerLayoutInfoProps) {
	const { t } = useTranslation();

	const { sleeves } = layout;

	const authors = getLayoutAuthors(layout);
	const size = getBoxSize(layout.size);

	return (
		<Container>
			<Stack gap={2}>
				<Row gap={2}>
					<Row alignItems="center" gap={1}>
						<OpenInFullIcon />
						<Typography variant="body1">
							{size}
							{t`mm`}
						</Typography>
					</Row>
					<Separator />
					{sleeves && (
						<Row alignItems="center" gap={1}>
							<Typography variant="subtitle1">{t`Sleeves`}:</Typography>
							{sleeves.map((sleeve) => (
								<Sleeve key={sleeve.id} sleeve={sleeve} />
							))}
						</Row>
					)}
				</Row>
				{authors && (
					<Stack gap={1}>
						{authors.map((author) => (
							<Author key={author.id} author={author} />
						))}
					</Stack>
				)}
			</Stack>
		</Container>
	);
}
