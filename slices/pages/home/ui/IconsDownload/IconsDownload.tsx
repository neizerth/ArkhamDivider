import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { ArkhamDividerAPI } from "@/shared/api";
import { Image, Row } from "@/shared/ui";
import { prefix } from "@/shared/util";

const url = prefix(ArkhamDividerAPI.fontsUrl);

const JUMBOTRON_MIN_HEIGHT = 200;

export function IconsDownload() {
	const { t } = useTranslation();
	const svgUrl = url`/icons.zip`;
	const ttfUrl = url`/icons.ttf`;
	return (
		<Container>
			<Box
				sx={{
					position: "relative",
					borderRadius: 1,
					overflow: "hidden",
					minHeight: JUMBOTRON_MIN_HEIGHT,
				}}
			>
				<Image
					aria-hidden
					sx={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
					src="/images/custom/icons.avif"
					alt=""
				/>
				<Box
					sx={{
						position: "absolute",
						inset: 0,
						background:
							"linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.2) 100%)",
					}}
				/>
				<Stack
					sx={{
						position: "relative",
						zIndex: 1,
						minHeight: JUMBOTRON_MIN_HEIGHT,
						justifyContent: "center",
						alignItems: "flex-start",
						px: { xs: 3, sm: 5 },
						py: { xs: 4, sm: 5 },
						gap: 2.5,
					}}
				>
					<Stack>
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
							{t("icons.download")}
						</Typography>
						<Typography variant="h5" color="common.white">
							{t("icons.download.description")}
						</Typography>
					</Stack>
					<Row gap={2}>
						<Box component="a" href={svgUrl} style={{ textDecoration: "none" }}>
							<Button variant="contained" color="primary" size="large">
								SVG
							</Button>
						</Box>
						<Box component="a" href={ttfUrl} style={{ textDecoration: "none" }}>
							<Button variant="contained" color="primary" size="large">
								TTF
							</Button>
						</Box>
					</Row>
				</Stack>
			</Box>
		</Container>
	);
}
