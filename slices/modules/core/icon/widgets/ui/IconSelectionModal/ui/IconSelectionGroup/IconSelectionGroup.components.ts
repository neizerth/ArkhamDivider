import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { GROUP_HEADER_HEIGHT } from "../../config";

export const Header = styled(Box)(({ theme }) => ({
	backgroundColor: "black",
	color: "white",
	fontSize: 24,
	lineHeight: 0.85,
	fontWeight: "bold",
	paddingInline: theme.spacing(2),
	height: GROUP_HEADER_HEIGHT,
	borderRadius: theme.spacing(1),
	position: "sticky",
	top: 0,
	left: 0,
	zIndex: 1,
	display: "flex",
	alignItems: "center",
}));

export const GroupHeader = styled(Header)(({ theme }) => ({
	gap: theme.spacing(1),
	fontSize: 16,
	lineHeight: 1.15,
}));

export const GroupIcon = styled(Box)(() => ({
	width: 18,
	height: 24,
	alignItems: "center",
	display: "flex",
}));
