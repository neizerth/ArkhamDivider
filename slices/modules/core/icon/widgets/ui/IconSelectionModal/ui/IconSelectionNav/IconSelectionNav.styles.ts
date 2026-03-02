import type { SxProps, Theme } from "@mui/material";

export const getContainerSx = ({ theme }: { theme: Theme }): SxProps => ({
	display: "flex",
	flexDirection: "column",
	flex: {
		xs: -1,
		sm: 1,
	},
	minHeight: 0,
	overflow: "hidden",
	position: "relative",
	borderRadius: 1,
	boxShadow: `inset 0 -1px 0 0 ${theme.palette.divider}`,
	paddingBottom: {
		xs: 2,
		sm: 0,
	},
	backgroundColor: {
		xs: theme.palette.background.paper,
		sm: "transparent",
	},
});

export const getScrollContainerSx = ({
	theme,
	scrollShadows,
}: {
	theme: Theme;
	scrollShadows: {
		top: boolean;
		bottom: boolean;
	};
}): SxProps => ({
	overflow: "auto",
	position: {
		xs: "static",
		sm: "absolute",
	},
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	boxShadow: [
		scrollShadows.top && `inset 0 8px 12px -8px ${theme.palette.grey[300]}`,
		scrollShadows.bottom && `inset 0 -8px 12px -4px ${theme.palette.grey[300]}`,
	]
		.filter(Boolean)
		.join(", "),
	transition: "box-shadow 0.2s ease",
});

export const getButtonSx = (isSelected: boolean): SxProps => ({
	py: 1,
	px: 2,
	textAlign: "left",
	border: "none",
	borderRadius: 1,
	cursor: "pointer",
	bgcolor: isSelected ? "action.selected" : "transparent",
	fontWeight: isSelected ? 600 : 400,
	"&:hover": { bgcolor: "action.hover" },
});
