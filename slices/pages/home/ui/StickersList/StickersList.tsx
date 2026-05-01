import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { dividerCategories } from "@/modules/divider/entities/items";
import { DividerCategoryPreview } from "@/modules/divider/entities/ui";
import { useResponsiveGap } from "@/shared/lib";
import { SectionTitle } from "@/shared/ui";

const stickerCategories = dividerCategories.filter(
	({ type, unlisted }) => type === "sticker" && !unlisted,
);

export function StickersList() {
	const getSpacing = useResponsiveGap(2);
	const columns = { xs: 1, sm: 2, md: 3 };

	const width = getSpacing(columns);
	const { t } = useTranslation();
	return (
		<Container>
			<SectionTitle>{t("Stickers")}</SectionTitle>

			<Stack gap={2} flexDirection="row" flexWrap="wrap">
				{stickerCategories.map((category) => (
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
		</Container>
	);
}
