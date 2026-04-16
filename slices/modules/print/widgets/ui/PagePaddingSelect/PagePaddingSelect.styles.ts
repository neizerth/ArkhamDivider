import type { SxProps, Theme } from "@mui/material";

export const pagePaddingListItemSx: SxProps = {
	width: "100%",
};

export const listItemButtonSx: SxProps = {
	display: "flex",
	width: "100%",
	justifyContent: "flex-start",
};

export const listItemTextSx: SxProps = {
	flex: 1,
	minWidth: 0,
};

export const previewGridSx: SxProps = {
	display: "grid",
	gridTemplateColumns: "auto auto auto",
	gridTemplateRows: "auto auto auto",
	alignItems: "center",
	justifyItems: "center",
	columnGap: 0.5,
	rowGap: 0.25,
	minWidth: 56,
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

export const getPreviewNumericCellSx = (
	gridColumn: number,
	gridRow: number,
): SxProps => ({
	...getPreviewCellSx(gridColumn, gridRow),
	typography: "caption",
	color: "text.secondary",
	textAlign: "center",
});

export const getPreviewSpacerCellSx = (
	gridColumn: number,
	gridRow: number,
): SxProps => ({
	...getPreviewCellSx(gridColumn, gridRow),
	minWidth: 6,
	minHeight: 6,
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
