import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Flag as BaseFlag } from "@/shared/ui";

export const Container = styled(Box)(({ theme }) => ({
	gap: theme.spacing(1),
	padding: theme.spacing(1),
}));

export const Flag = styled(BaseFlag)`
  font-size: 30px;
  line-height: 1;
  height: 1em;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const Content = styled(Stack)(({ theme }) => ({
	position: "relative",
	paddingInline: theme.spacing(1),
}));

export const DropDown = styled(Box)(({ theme }) => ({
	position: "absolute",
	top: theme.spacing(-1),
	left: 0,
	overflow: "auto",
	maxHeight: "50vh",
	backgroundColor: theme.palette.background.paper,
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.shadows[1],
}));

export const DropDownContent = styled(Stack)`
`;

export const DropDownItem = styled(Box)(({ theme }) => ({
	":hover": {
		backgroundColor: theme.palette.action.hover,
	},

	padding: theme.spacing(1),
}));
