import type { SxProps } from "@mui/material/styles";

export type DPI = 300 | 600 | 1200;

export type PrintUnitProps = {
	mm: (value: number) => string;
	dpi: DPI;
};

export type PrintUnitCallback<T> = (props: PrintUnitProps) => T;

export type PrintSxCallback = PrintUnitCallback<SxProps>;
