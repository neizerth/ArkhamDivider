import ButtonGroup from "@mui/material/ButtonGroup";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";

export const Group = styled(ButtonGroup)(({ theme }) => ({
	boxShadow: theme.shadows[1],
}));

export const ContextMenu = styled(Popper)`
  z-index: 1;
`;

export const HQ = styled("span")(({ theme }) => ({
	color: theme.palette.grey[600],
	border: `1px solid ${theme.palette.grey[600]}`,
	borderRadius: theme.shape.borderRadius,
	padding: theme.spacing(0, 0.5),
	marginLeft: theme.spacing(0.5),
	fontSize: 12,
}));
