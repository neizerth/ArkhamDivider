import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const Main = styled("main")`
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  background-color: #f9f9f9;
`;

export const Container = styled(Stack)(({ theme }) => ({
	minHeight: "100vh",
	paddingTop: theme.spacing(12),
}));
