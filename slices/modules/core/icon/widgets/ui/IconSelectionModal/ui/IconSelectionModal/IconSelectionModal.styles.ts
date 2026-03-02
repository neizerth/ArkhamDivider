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
	display: "flex",
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
	opacity: { xs: navActive ? 1 : 0, sm: 1 },
	transform: {
		xs: navActive ? "translateX(0)" : "translateX(-100%)",
		sm: "none",
	},
	pointerEvents: { xs: navActive ? "auto" : "none", sm: "auto" },
	transition: {
		xs: "opacity 0.25s ease, transform 0.25s ease",
		sm: "none",
	},
});
