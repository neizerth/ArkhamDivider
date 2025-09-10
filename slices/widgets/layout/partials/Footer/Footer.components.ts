import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Row, TextLink } from "@/shared/ui";

export const Container = styled("footer")(({ theme }) => ({
	padding: theme.spacing(2),
	backgroundColor: theme.palette.background.paper,
	boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
}));

export const Content = styled(Row)(({ theme }) => ({
	justifyContent: "center",
	flexWrap: "wrap",
	alignItems: "center",
	backgroundColor: theme.palette.background.paper,
	gap: theme.spacing(2),
}));

export const Disclaimer = styled(Box)`
	font-size: 12px;
	min-width: 200px;
	flex: 1
`;

export const Links = styled(Row)(({ theme }) => ({
	flexWrap: "wrap",
	justifyContent: "center",
	gap: theme.spacing(2),
	fontSize: "1.5rem",
}));

export const IconLink = styled(TextLink)(({ theme }) => ({
	color: theme.palette.primary.dark,
}));
