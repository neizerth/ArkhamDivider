import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
	getLayoutAuthors,
	getLayoutDescription,
} from "@/modules/divider/entities/lib";
import type {
	DividerCategory,
	DividerLayout,
} from "@/modules/divider/shared/model";
import { selectBleedEnabled } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import { getBoxSize } from "@/shared/util";
import { BleedInfo } from "../BleedInfo";
import { DividerLayoutAuthorInfo as Author } from "../DividerLayoutAuthorInfo";
import { DividerLayoutSleeveInfo } from "../DividerLayoutSleeveInfo/DividerLayoutSleeveInfo";
import * as C from "./DividerLayoutInfo.components";

type DividerLayoutInfoProps = {
	layout: DividerLayout;
	category: DividerCategory;
};

const optionTitleSx = {
	minWidth: { xs: 0, sm: 120 },
	alignItems: "center",
	justifyContent: { xs: "flex-start", sm: "flex-end" },
	gap: 1,
} as const;

const optionSx = {
	alignItems: "center",
	gap: 2,
	flexWrap: "wrap",
} as const;

const optionLabelSx = {
	order: { xs: 2, sm: 0 },
} as const;

export function DividerLayoutInfo({
	layout,
	category,
}: DividerLayoutInfoProps) {
	const { t } = useTranslation();
	const bleedEnabled = useAppSelector(selectBleedEnabled);
	const { sleeves } = layout;

	const authors = getLayoutAuthors(layout);
	const size = getBoxSize(layout.size);
	const image = layout.image ?? category.image;

	const description = getLayoutDescription(layout);

	return (
		<Stack gap={2}>
			<Row
				sx={{
					flexDirection: {
						xs: "column",
						sm: "row",
					},
					gap: {
						xs: 0,
						sm: 1,
						md: 2,
					},
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Stack
					sx={{
						flex: 1,
						padding: { xs: 1, sm: 0 },
						gap: 2,
					}}
				>
					{authors && (
						<Stack gap={1}>
							{authors.map((author, index) => (
								<Fragment key={author.id}>
									{index !== 0 && <Divider sx={{ maxWidth: 300, margin: 2 }} />}
									<Author author={author} />
								</Fragment>
							))}
						</Stack>
					)}
					<Stack gap={2}>
						<Row sx={optionSx}>
							<Row sx={optionTitleSx}>
								<Typography
									variant="body2"
									sx={optionLabelSx}
								>{t`Size`}</Typography>
								<C.Icon title={t`Size`}>
									<OpenInFullIcon />
								</C.Icon>
							</Row>
							<Typography variant="body1" flex={1}>
								{size} {t`mm`}
							</Typography>
						</Row>
						<Row sx={optionSx}>
							<Row sx={optionTitleSx}>
								<Typography
									variant="body2"
									sx={optionLabelSx}
								>{t`Orientation`}</Typography>
								<C.Icon title={t`Orientation`}>
									<ScreenRotationIcon />
								</C.Icon>
							</Row>
							<Typography variant="body1" flex={1}>
								{t(`orientation.${layout.orientation}`)}
							</Typography>
						</Row>
						{bleedEnabled && <BleedInfo bleed={layout.bleed} />}
						{sleeves && <DividerLayoutSleeveInfo sleeves={sleeves} />}
					</Stack>
				</Stack>
				{image && (
					<Stack gap={1}>
						<Row
							gap={2}
							sx={{
								flex: 1,
								justifyContent: {
									xs: "center",
									sm: "flex-end",
								},
							}}
						>
							<Box
								component="img"
								src={image}
								alt="layout"
								sx={{ maxWidth: 300 }}
							/>
						</Row>

						<Typography variant="body2" textAlign="center" maxWidth={300}>
							{t(description)}
						</Typography>
					</Stack>
				)}
			</Row>
		</Stack>
	);
}
