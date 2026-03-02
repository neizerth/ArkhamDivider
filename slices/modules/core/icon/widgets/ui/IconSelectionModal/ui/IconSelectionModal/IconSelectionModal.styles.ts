import type { SxProps } from "@mui/material";

export const contentSx: SxProps = {
	display: "flex",
	flex: 1,
	minHeight: 0,
	overflow: "hidden",
};

export const getSidebarSx = (navActive: boolean): SxProps => ({
	position: {
		xs: "absolute",
		sm: "static",
	},
	display: {
		xs: navActive ? "flex" : "none",
		sm: "flex",
	},
	flexDirection: "column",
	minHeight: 0,
	overflow: "hidden",
	alignSelf: "stretch",
	top: 0,
	left: 0,
	backgroundColor: {
		xs: "background.paper",
		sm: "transparent",
	},
	zIndex: 1,
});
