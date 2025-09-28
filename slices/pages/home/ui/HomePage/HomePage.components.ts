import { styled } from "@mui/material/styles";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";

export const Container = styled(SingleColumnLayout)(({ theme }) => ({
	padding: theme.spacing(2),
}));
