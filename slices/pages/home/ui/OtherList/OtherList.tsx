import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { propEq } from "ramda";
import { useTranslation } from "react-i18next";
import { dividerCategories } from "@/modules/divider/entities/items";
import { DividerCategoryPreview } from "@/modules/divider/entities/ui";
import { useResponsiveGap } from "@/shared/lib";
import { Image, Row, SectionTitle } from "@/shared/ui";

const bookmarkCategories = dividerCategories.filter(propEq("bookmark", "type"));

const binderSpinesUrl =
	"https://boardgamegeek.com/filepage/320467/binder-spines";

export function OtherList() {
	const getSpacing = useResponsiveGap(2);
	const columns = { xs: 1, sm: 2, md: 3 };

	const width = getSpacing(columns);
	const { t } = useTranslation();
	return (
		<Container>
			<SectionTitle>{t("Other")}</SectionTitle>

			<Row gap={2} flexWrap="wrap">
				{bookmarkCategories.map((category) => (
					<Box
						key={category.id}
						sx={{
							width,
						}}
					>
						<DividerCategoryPreview category={category} />
					</Box>
				))}
				<Box
					sx={{
						width: 3,
						flex: 1,
						position: "relative",
						overflow: "hidden",
					}}
				>
					<Image
						src="/images/assets/binder-spines.avif"
						sx={{
							width: "100%",
							height: "100%",
							position: "absolute",
							objectFit: "cover",
							objectPosition: "top left",
							inset: 0,
						}}
					/>
					<Box
						sx={{
							position: "absolute",
							inset: 0,
							background: "rgba(0,0,0,0.3)",
						}}
					/>
					<Stack
						sx={{
							position: "relative",
							zIndex: 1,
							minHeight: 250,
							height: "100%",
							justifyContent: "flex-end",
							alignItems: "flex-start",
							px: { xs: 3, sm: 5 },
							py: { xs: 5, sm: 6 },
							gap: 2.5,
						}}
					>
						<Typography
							variant="h3"
							component="h2"
							color="common.white"
							fontWeight={600}
							sx={{
								fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
								textShadow: "0 1px 12px rgba(0,0,0,0.45)",
							}}
						>
							{t("Binder Spines")}
						</Typography>
						<a
							href={binderSpinesUrl}
							target="_blank"
							style={{ textDecoration: "none" }}
						>
							<Button variant="contained" color="primary" size="large">
								{t("Download")}
							</Button>
						</a>
					</Stack>
				</Box>
			</Row>
		</Container>
	);
}
