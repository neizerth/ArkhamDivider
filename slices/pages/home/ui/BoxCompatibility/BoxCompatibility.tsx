import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { brands } from "@/entities/brand/config";
import { selectLanguage } from "@/modules/core/i18n/shared/lib/store";
import { Link } from "@/modules/core/router/entities/ui";
import { useAppSelector, useResponsiveGap } from "@/shared/lib";
import { SectionTitle } from "@/shared/ui";

export function BoxCompatibility() {
	const language = useAppSelector(selectLanguage);
	const { t } = useTranslation();
	const getSpacing = useResponsiveGap();

	const data = brands.filter(
		(item) => !item.locales || item.locales?.includes(language),
	);

	const mdSize = data.length > 2 ? 3 : data.length;

	const columns = { xs: 1, sm: 2, md: mdSize };

	const width = getSpacing(columns);

	return (
		<section>
			<Container>
				<SectionTitle>{t("Compatible with")}</SectionTitle>

				<Stack gap={2} flexDirection="row" flexWrap="wrap">
					{data.map((item) => (
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
