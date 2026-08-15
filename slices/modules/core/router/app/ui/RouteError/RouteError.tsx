import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

/**
 * Last resort for a route that failed to load.
 *
 * `lazyWithReload` already reloads once for a stale chunk, so reaching this component means
 * either that reload did not help or the failure was something else.
 *
 * Safe to use i18n: `I18NProvider` wraps the router, and core strings are registered at
 * init. Still avoids store/data dependencies — the app may otherwise be in a bad state.
 *
 * Intentionally does not branch on the error: `useRouteError` does not reliably hand back the
 * original `Error`, so a stale-chunk check here is unreliable — and the user's action is the
 * same either way.
 */
export function RouteError() {
	const { t } = useTranslation();

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
				<Button variant="contained" onClick={() => window.location.reload()}>
					{t("error.route.reload")}
				</Button>
			</Box>
		</Stack>
	);
}
