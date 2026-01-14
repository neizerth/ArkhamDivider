import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Box from "@mui/material/Box";
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
					<Row alignItems="center" gap={3} flex={1}>
						<Row
							alignItems="center"
							justifyContent="flex-end"
							gap={1}
							sx={{
								minWidth: { xs: 0, sm: 120 },
							}}
						>
							<Typography
								variant="body2"
								sx={{
									display: { xs: "none", sm: "block" },
								}}
							>{t`Size`}</Typography>
							<C.Icon title={t`Size`}>
								<OpenInFullIcon />
							</C.Icon>
						</Row>
						<Typography variant="body1" flex={1}>
							{size} {t`mm`}
						</Typography>
					</Row>
					{sleeves && (
						<Row gap={3}>
							<Row
								alignItems="center"
								justifyContent="flex-end"
								gap={1}
								sx={{
									minWidth: { xs: 0, sm: 120 },
								}}
							>
								<Typography
									variant="body2"
									sx={{
										display: { xs: "none", sm: "block" },
									}}
								>{t`Sleeves`}</Typography>
								<C.Icon title={t`Sleeves`}>
									<ShieldOutlinedIcon />
								</C.Icon>
							</Row>
							<Box position={"relative"}>
								<Box
									sx={{
										overflow: "scroll",
									}}
								>
									<Row gap={1}>
										{sleeves.map((sleeve) => (
											<Sleeve key={sleeve.id} sleeve={sleeve} />
										))}
									</Row>
								</Box>
							</Box>
						</Row>
					)}
				</Stack>
			</Stack>
		</Row>
	);
}
