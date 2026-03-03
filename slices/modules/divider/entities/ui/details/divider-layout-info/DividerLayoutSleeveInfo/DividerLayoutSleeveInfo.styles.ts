import type { SxProps } from "@mui/material";

export const optionSx: SxProps = {
	alignItems: "center",
	gap: 2,
	flexWrap: "wrap",
};

export const optionTitleSx: SxProps = {
	minWidth: { xs: 0, sm: 120 },
	width: { xs: "100%", sm: "auto" },
	alignItems: "center",
	justifyContent: { xs: "flex-start", sm: "flex-end" },
	gap: 1,
};

export const optionLabelSx: SxProps = {
	order: { xs: 2, sm: 0 },
};
