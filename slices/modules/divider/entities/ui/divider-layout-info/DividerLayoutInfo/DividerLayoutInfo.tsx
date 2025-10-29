import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { Row } from "@/shared/ui";
import { getBoxSize } from "@/shared/util";
import { getLayoutAuthors } from "../../../lib";
import { DividerLayoutAuthorInfo as Author } from "../DividerLayoutAuthorInfo";
import { DividerLayoutSleeveInfo as Sleeve } from "../DividerLayoutSleeveInfo";
import * as C from "./DividerLayoutInfo.components";

type DividerLayoutInfoProps = {
	layout: DividerLayout;
};

export function DividerLayoutInfo({ layout }: DividerLayoutInfoProps) {
	const { t } = useTranslation();

	const { sleeves } = layout;

	const authors = getLayoutAuthors(layout);
	const size = getBoxSize(layout.size);

	return (
		<Row alignItems="center" justifyContent="space-between">
			<Stack gap={6}>
				{authors && (
					<Stack gap={1}>
						{authors.map((author) => (
							<Author key={author.id} author={author} />
						))}
					</Stack>
				)}
				<Stack gap={2}>
					<Row alignItems="center" gap={2}>
						<C.Icon title={t`Size`}>
							<OpenInFullIcon />
						</C.Icon>
						<Typography variant="body1">
							{size}
							{t`mm`}
						</Typography>
					</Row>
					{sleeves && (
						<Row alignItems="center" gap={2}>
							<C.Icon title={t`Sleeves`}>
								<ShieldOutlinedIcon />
							</C.Icon>
							<Row gap={1}>
								{sleeves.map((sleeve) => (
									<Sleeve key={sleeve.id} sleeve={sleeve} />
								))}
							</Row>
						</Row>
					)}
				</Stack>
			</Stack>
		</Row>
	);
}
