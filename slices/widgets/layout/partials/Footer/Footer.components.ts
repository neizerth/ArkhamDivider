import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const Container = styled("footer")(({ theme }) => ({
	padding: theme.spacing(2),
}));

export const Disclaimer = styled(Box)`

`;

export const Links = styled(Stack)`
  flex-direction: row;
`;
