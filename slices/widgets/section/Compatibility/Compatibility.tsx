import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { useFlexGap } from "@/shared/lib";
import brands from "./brands.json";
import * as C from "./Compatibility.components";

type CompatibilityProps = JSX.IntrinsicElements["section"];

export function Compatibility(props: CompatibilityProps) {
	const { t } = useTranslation();
	const flexSpacing = useFlexGap(2);
	return (
		<C.Container {...props}>
			<Container>
				<Divider component="div" role="presentation">
					<Typography variant="h5">{t("Compatible with")}</Typography>
				</Divider>
				<Stack gap={2} flexDirection="row" flexWrap="wrap">
					{brands.map((brand) => (
						<C.Link
							key={brand.id}
							to={`/brand/${brand.id}`}
							sx={{
								width: {
									xs: "100%",
									sm: flexSpacing(2),
									md: flexSpacing(3),
								},
							}}
						>
							<Card key={brand.id}>
								<Box padding={2}>
									<CardMedia
										sx={{ height: 140, backgroundSize: "contain" }}
										image={brand.image}
										title={brand.name}
									/>
								</Box>
							</Card>
						</C.Link>
					))}
				</Stack>
			</Container>
		</C.Container>
	);
}
