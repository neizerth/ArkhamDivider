import type { SxProps } from "@mui/material/styles";
import type { PrintUnitProps } from "@/modules/print/shared/model";

export type Translation = Record<string, string>;

export type LocaleConfig<T> = Record<string, unknown> & {
	default: T;
};

export type LocaleSx = LocaleConfig<SxProps>;
export type LocaleSxCallback = (props: PrintUnitProps) => LocaleSx;
