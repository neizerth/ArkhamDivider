import type { SxProps } from "@mui/material";

export const optionSx: SxProps = {
	alignItems: "center",
	justifyContent: { xs: "flex-start", sm: "flex-end" },
	gap: 2,
	flexWrap: "wrap",
};

export const optionTitleSx: SxProps = {
	minWidth: { xs: 0, sm: 120 },
	alignItems: "center",
	justifyContent: { xs: "flex-start", sm: "flex-end" },
	gap: 1,
};

export const optionLabelSx: SxProps = {
	order: { xs: 2, sm: 0 },
};

export const valueRowSx: SxProps = {
	flex: 1,
	alignItems: "center",
	gap: 0.5,
};

export const infoButtonSx: SxProps = {
	p: 0.25,
};

export const popoverContentSx: SxProps = {
	p: 2,
	maxWidth: 320,
};
