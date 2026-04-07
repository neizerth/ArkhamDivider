import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { propEq } from "ramda";
import { useTranslation } from "react-i18next";
import { IconCorrection as Icon } from "@/modules/core/icon/entities/ui";
import { IconPopover } from "@/modules/core/icon/shared/ui";
import { dividerCategories } from "@/modules/divider/entities/items";
import { DividerCategoryPreview } from "@/modules/divider/entities/ui";
import { useResponsiveGap } from "@/shared/lib";
import { Row, SectionTitle } from "@/shared/ui";

const dividerOnlyCategories = dividerCategories.filter(
	propEq("divider", "type"),
);

const iconSx = {
	ml: 0.5,
	fontSize: 20,
};

export function DividerList() {
	const getSpacing = useResponsiveGap(2);
	const columns = { xs: 1, sm: 2, md: 3 };

	const width = getSpacing(columns);
	const { t } = useTranslation();
	return (
		<Container>
			<SectionTitle>{t("Dividers")}</SectionTitle>
			<Stack gap={2}>
				<Row gap={2} flexWrap="wrap" justifyContent="center">
					<Chip
						label={
							<Row alignItems="center">
								{t("divider.canBeSleeved")}
								<IconPopover
									ariaLabel={t("info.sleeves")}
									description={
										<Typography variant="body2">{t("info.sleeves")}</Typography>
									}
								/>
							</Row>
						}
						icon={<ShieldOutlinedIcon />}
					/>

					<Chip
						label={t("divider.hasGrayscale")}
						icon={<ContrastOutlinedIcon />}
					/>
					<Chip
						label={t("divider.chapter1BoxCompatible")}
						icon={<Icon icon="the_first_day" sx={iconSx} />}
					/>
					<Chip
						label={t("divider.chapter2BoxCompatible")}
						icon={<Icon icon="the_second_day" sx={iconSx} />}
					/>
					<Chip
						icon={<Icon icon="drawer2" sx={iconSx} />}
						label={
							<Row alignItems="center">
								{t("divider.forDeckBox")}
								<IconPopover
									ariaLabel={t("info.deckBox")}
									description={
										<Typography variant="body2">{t("info.deckBox")}</Typography>
									}
								/>
							</Row>
						}
					/>
				</Row>
				<Stack gap={2} flexDirection="row" flexWrap="wrap">
					{dividerOnlyCategories.map((category) => (
						<Box
							key={category.id}
							sx={{
								width,
							}}
						>
							<DividerCategoryPreview category={category} />
						</Box>
					))}
				</Stack>
			</Stack>
		</Container>
	);
}
