import BleedIcon from "@assets/images/bleed.svg?react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { getLayoutAuthors } from "@/modules/divider/entities/lib";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { selectBleedEnabled } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import { getBoxSize } from "@/shared/util";
import { DividerLayoutAuthorInfo as Author } from "../DividerLayoutAuthorInfo";
import { DividerLayoutSleeveInfo as Sleeve } from "../DividerLayoutSleeveInfo";
import * as C from "./DividerLayoutInfo.components";

type DividerLayoutInfoProps = {
	layout: DividerLayout;
};

const optionTitleSx = {
	minWidth: { xs: 0, sm: 120 },
	alignItems: "center",
	justifyContent: { xs: "flex-start", sm: "flex-end" },
	gap: 1,
} as const;

const sleevesTitleSx = {
	...optionTitleSx,
	width: { xs: "100%", sm: "auto" },
} as const;

const optionSx = {
	alignItems: "center",
	justifyContent: { xs: "flex-start", sm: "flex-end" },
	gap: 2,
	flexWrap: "wrap",
} as const;

const optionLabelSx = {
	order: { xs: 2, sm: 0 },
} as const;

export function DividerLayoutInfo({ layout }: DividerLayoutInfoProps) {
	const { t } = useTranslation();
	const bleedEnabled = useAppSelector(selectBleedEnabled);

	const { sleeves } = layout;

	const authors = getLayoutAuthors(layout);
	const size = getBoxSize(layout.size);

	return (
		<Row alignItems="center" justifyContent="space-between">
			<Stack gap={6} padding={{ xs: 1, sm: 0 }}>
				{authors && (
					<Stack gap={1}>
						{authors.map((author) => (
							<Author key={author.id} author={author} />
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
					{bleedEnabled && (
						<Row sx={optionSx}>
							<Row sx={optionTitleSx}>
								<Typography
									variant="body2"
									sx={optionLabelSx}
								>{t`Bleed`}</Typography>
								<C.Icon title={t`Bleed`}>
									<BleedIcon width={24} height={24} />
								</C.Icon>
							</Row>
							<Typography variant="body1" flex={1}>
								{layout.bleed} {t`mm`}
							</Typography>
						</Row>
					)}
					{sleeves && (
						<Row sx={optionSx}>
							<Row sx={sleevesTitleSx}>
								<Typography
									variant="body2"
									sx={optionLabelSx}
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
