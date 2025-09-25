import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { Row } from "@/shared/ui";

export const Label = styled("div")(({ theme }) => ({
	color: theme.palette.grey[500],
}));

export const Item = styled(Row)(({ theme }) => ({
	flex: 1,
	gap: theme.spacing(1),
	justifyContent: "space-between",
}));

export const Size = styled(ListItemText)`
  text-align: right;
`;
