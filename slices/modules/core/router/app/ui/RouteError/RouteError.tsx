import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router";
import { copyToClipboard } from "@/shared/lib";
import { formatRouteError } from "../../lib";

/**
 * Last resort for a route that failed to load.
 *
 * `lazyWithReload` already reloads once for a stale chunk, so reaching this component means
 * either that reload did not help or the failure was something else.
 *
 * Reloading keeps the current URL, so a route-specific failure comes back immediately.
 * A full navigation to `/` loads a different page (and a fresh `index.html`).
 *
 * Safe to use i18n: `I18NProvider` wraps the router, and core strings are registered at
 * init. Still avoids store/data dependencies — the app may otherwise be in a bad state.
 *
 * `useRouteError` may not be an `Error` instance; `formatRouteError` dumps whatever we got.
 */
export function RouteError() {
	const { t } = useTranslation();
	const error = useRouteError();
	const details = formatRouteError(error);
	const [copied, setCopied] = useState(false);

	const copyDetails = useCallback(() => {
		copyToClipboard(details);
		setCopied(true);
	}, [details]);

	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			gap={2}
			sx={{ minHeight: "60vh", padding: 4, textAlign: "center" }}
		>
			<Typography variant="h6">{t("error.route.title")}</Typography>
			<Typography variant="body2" color="text.secondary">
				{t("error.route.description")}
			</Typography>
			<Box>
				<Stack
					direction={{ xs: "column", sm: "row" }}
					gap={1}
					justifyContent="center"
				>
					<Button variant="contained" href="/">
						{t("error.route.home")}
					</Button>
					<Button variant="outlined" onClick={() => window.location.reload()}>
						{t("error.route.reload")}
					</Button>
				</Stack>
			</Box>
			<Accordion
				disableGutters
				elevation={0}
				sx={{
					maxWidth: 640,
					width: "100%",
					textAlign: "left",
					bgcolor: "action.hover",
					"&:before": { display: "none" },
				}}
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="body2">{t("error.route.details")}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack gap={1} alignItems="flex-start">
						<Button size="small" onClick={copyDetails}>
							{copied ? t("error.route.copied") : t("error.route.copy")}
						</Button>
						<Box
							component="pre"
							sx={{
								m: 0,
								p: 1,
								width: "100%",
								maxHeight: 240,
								overflow: "auto",
								fontSize: 12,
								lineHeight: 1.4,
								whiteSpace: "pre-wrap",
								wordBreak: "break-word",
							}}
						>
							{details}
						</Box>
					</Stack>
				</AccordionDetails>
			</Accordion>
		</Stack>
	);
}
