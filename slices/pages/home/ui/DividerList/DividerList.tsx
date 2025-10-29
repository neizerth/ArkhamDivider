import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { dividerCategories } from "@/modules/divider/entities/items";
import { DividerCategoryPreview } from "@/modules/divider/entities/ui";
import { useResponsiveGap } from "@/shared/lib";
import { Row, SectionTitle } from "@/shared/ui";
import * as C from "./DividerList.components";

export function DividerList() {
	const getSpacing = useResponsiveGap(2);
	const columns = { xs: 2, sm: 3, md: 4 };

	const width = getSpacing(columns);
	const { t } = useTranslation();
	return (
		<C.Container>
			<Container>
				<SectionTitle>{t("Dividers")}</SectionTitle>
				<Stack gap={2}>
					<Row gap={2} flexWrap="wrap">
						<Chip
							label={t("divider.canBeSleeved")}
							icon={<ShieldOutlinedIcon />}
						/>
						<Chip
							label={t("divider.hasGrayscale")}
							icon={<ContrastOutlinedIcon />}
						/>
					</Row>
					<Stack gap={2} flexDirection="row" flexWrap="wrap">
						{dividerCategories.map((category) => (
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
		</C.Container>
	);
}
