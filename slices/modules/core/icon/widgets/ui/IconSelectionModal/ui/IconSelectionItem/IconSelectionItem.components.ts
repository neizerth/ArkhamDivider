import { Box, styled } from "@mui/material";
import { ICON_GROUP_SIZE } from "../../config";

export const Icon = styled(Box)(({ theme }) => ({
	width: ICON_GROUP_SIZE,
	height: ICON_GROUP_SIZE,
	borderRadius: theme.spacing(1),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: 32,
	cursor: "pointer",
}));
