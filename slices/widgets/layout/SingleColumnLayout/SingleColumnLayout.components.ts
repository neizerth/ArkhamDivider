import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const Main = styled("main")`
  flex-grow: 1;
	@media screen {
  	margin-bottom: ${({ theme }) => theme.spacing(8)};
	}
`;

export const Container = styled(Stack)(({ theme }) => ({
	"@media screen": {
		minHeight: "100vh",
		paddingTop: theme.spacing(12),
		backgroundColor: "#f9f9f9",
	},
}));
