import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
/**
 * Last resort for a route that failed to load.
 *
 * `lazyWithReload` already reloads once for a stale chunk, so reaching this component means
 * either that reload did not help or the failure was something else. Deliberately plain: it
 * has to render when the app is in a bad state, so no translations (i18n may not have
 * loaded) and no data dependencies.
 *
 * Intentionally does not branch on the error: `useRouteError` does not reliably hand back the
 * original `Error`, so a stale-chunk check here is unreliable — and the user's action is the
 * same either way.
 */
export function RouteError() {
	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			gap={2}
			sx={{ minHeight: "60vh", padding: 4, textAlign: "center" }}
		>
			<Typography variant="h6">This page could not be loaded</Typography>
			<Typography variant="body2" color="text.secondary">
				The app may have been updated while this tab was open. Reloading usually
				fixes it.
			</Typography>
			<Box>
				<Button variant="contained" onClick={() => window.location.reload()}>
					Reload
				</Button>
			</Box>
		</Stack>
	);
}
