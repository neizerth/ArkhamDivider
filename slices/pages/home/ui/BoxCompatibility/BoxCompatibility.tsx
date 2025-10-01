import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { brands } from "@/entities/brand/config";
import { Link } from "@/modules/core/router/entities/ui";
import { useResponsiveGap } from "@/shared/lib";
import { SectionTitle } from "@/shared/ui";

export function BoxCompatibility() {
	const { t } = useTranslation();
	const getSpacing = useResponsiveGap();
	const columns = { xs: 1, sm: 2, md: 3 };

	const width = getSpacing(columns);
	return (
		<section>
			<Container>
				<SectionTitle>{t("Compatible with")}</SectionTitle>

				<Stack gap={2} flexDirection="row" flexWrap="wrap">
					{brands.map((item) => (
						<Link key={item.id} to={item.url} sx={{ width }}>
							<Card key={item.id}>
								<Box padding={2}>
									<CardMedia
										sx={{ height: 140, backgroundSize: "contain" }}
										image={item.image}
										title={item.title}
									/>
								</Box>
							</Card>
						</Link>
					))}
				</Stack>
			</Container>
		</section>
	);
}
