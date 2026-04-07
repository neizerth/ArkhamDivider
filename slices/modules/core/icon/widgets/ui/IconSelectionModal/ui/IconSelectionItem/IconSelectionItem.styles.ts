import type { SxProps } from "@mui/material";

export const getIconStyles = (isSelected: boolean): SxProps => ({
	backgroundColor: isSelected ? "rgb(255, 205, 72)" : "rgb(248, 248, 248)",
	"&:hover": {
		border: isSelected ? "none" : "3px solid #e2e2e2",
	},
});
