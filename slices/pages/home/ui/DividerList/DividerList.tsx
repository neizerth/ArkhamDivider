import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Link } from "@/modules/core/router/entities/ui";
import { useResponsiveGap } from "@/shared/lib";
import { SectionTitle } from "@/shared/ui";
import * as C from "./DividerList.components";
import dividers from "./dividers.json";

const height = 200;

export function DividerList() {
	const getSpacing = useResponsiveGap(2);
	const columns = { xs: 2, sm: 3, md: 4 };

	const width = getSpacing(columns);
	const { t } = useTranslation();
	return (
		<C.Container>
			<Container>
				<SectionTitle>{t("Dividers")}</SectionTitle>
				<Stack gap={2} flexDirection="row" flexWrap="wrap">
					{dividers.map((item) => (
						<Link
							key={item.id}
							to={item.url}
							sx={{
								width,
								textDecoration: "none",
							}}
						>
							<Card key={item.id}>
								<Box padding={2}>
									<CardMedia
										sx={{ height, backgroundSize: "contain" }}
										image={item.image}
										title={item.title}
									/>
									<Typography variant="body2" textAlign="center">
										{item.title}
									</Typography>
								</Box>
							</Card>
						</Link>
					))}
				</Stack>
			</Container>
		</C.Container>
	);
}
