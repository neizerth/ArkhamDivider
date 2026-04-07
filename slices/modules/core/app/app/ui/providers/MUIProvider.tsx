import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import { theme } from "@/shared/config";

export function MUIProvider({ children }: PropsWithChildren) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
