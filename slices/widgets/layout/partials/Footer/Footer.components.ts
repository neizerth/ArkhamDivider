import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Row } from "@/shared/ui";

export const Container = styled("footer")(({ theme }) => ({
	padding: theme.spacing(2),
	backgroundColor: theme.palette.background.paper,
}));

export const Disclaimer = styled(Box)`

`;

export const Links = styled(Row)`
`;
