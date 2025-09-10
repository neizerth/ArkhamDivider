import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Row } from "@/shared/ui";

export const Container = styled("footer")(({ theme }) => ({
	padding: theme.spacing(2),
	backgroundColor: theme.palette.background.paper,
}));

export const Content = styled(Row)(({ theme }) => ({
	justifyContent: "space-between",
	alignItems: "center",
	backgroundColor: theme.palette.background.paper,
}));

export const Disclaimer = styled(Box)`

`;

export const Links = styled(Row)(({ theme }) => ({
	gap: theme.spacing(2),
	fontSize: "28px",
}));
