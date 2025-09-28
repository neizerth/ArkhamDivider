import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const Container = styled(Stack)(({ theme }) => ({
	paddingInline: theme.spacing(2),
}));
