import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import { Link } from "@/modules/core/router/entities/ui";
import { Image } from "@/shared/ui";

const JUMBOTRON_MIN_HEIGHT = 200;

export function InvestigatorTokensPreview() {
	const { t } = useTranslation();
	const to = layoutRoute({ layoutId: "investigator-tokens" });

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
					src="/images/divider/render/investigator-tokens.avif"
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
						{t("Investigator Tokens")}
					</Typography>
					<Link to={to} style={{ textDecoration: "none" }}>
						<Button variant="contained" color="primary" size="large">
							{t("Generate")}
						</Button>
					</Link>
				</Stack>
			</Box>
		</Container>
	);
}
