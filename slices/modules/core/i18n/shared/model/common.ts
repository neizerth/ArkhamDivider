import type { SxProps } from "@mui/material/styles";
import type { PrintUnitProps } from "@/modules/print/shared/model";

export type Translation = Record<string, string>;

export type LocaleSx = Record<string, SxProps> & {
	default?: SxProps;
};
export type LocaleSxCallback = (props: PrintUnitProps) => LocaleSx;
