import type { SxProps, Theme } from "@mui/material";

export const listItemButtonSx: SxProps = {
	paddingLeft: 0,
};

export const previewGridSx: SxProps = {
	display: "grid",
	gridTemplateColumns: "auto auto auto",
	gridTemplateRows: "auto auto auto",
	alignItems: "center",
	justifyItems: "center",
	minWidth: 20,
	position: "relative",
	right: -11,
};

export const previewUniformGridSx: SxProps = {
	textAlign: "right",
	paddingRight: 1,
};

export const getPreviewCellSx = (
	gridColumn: number,
	gridRow: number,
): SxProps => ({
	gridColumn,
	gridRow,
});

export const dialogContentSx: SxProps = {
	display: "flex",
	flexDirection: "column",
	gap: 2,
};

export const formControlSx: SxProps = {
	marginTop: 0.5,
};

export const paddingGridSx: SxProps = {
	display: "grid",
	gridTemplateColumns: "1fr minmax(0, 140px) 1fr",
	gridTemplateRows: "auto auto auto",
	alignItems: "center",
	justifyItems: "stretch",
	columnGap: 1,
	rowGap: 1,
};

export const pageFieldsetSx: SxProps<Theme> = {
	margin: 0,
	padding: 2,
	borderRadius: 1,
	border: (theme) => `1px solid ${theme.palette.divider}`,
};

export const pageLegendSx: SxProps = {
	px: 1,
	color: "text.secondary",
	typography: "caption",
};

export const paddingContentPlaceholderSx: SxProps<Theme> = {
	gridColumn: 2,
	gridRow: 2,
	width: "100%",
	minHeight: 56,
	borderRadius: 1,
	border: (theme) => `1px dashed ${theme.palette.divider}`,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "text.secondary",
	typography: "caption",
	px: 1,
	textAlign: "center",
};

export const getPaddingSideFieldCellSx = (
	gridColumn: number,
	gridRow: number,
): SxProps => ({
	gridColumn,
	gridRow,
	width: "100%",
});
