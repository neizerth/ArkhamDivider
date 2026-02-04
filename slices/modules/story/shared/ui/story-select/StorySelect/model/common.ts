import type { AutocompleteProps } from "@mui/material/Autocomplete";
import type { Story } from "@/modules/story/shared/model";
import type { Defined } from "@/shared/model";

export type SelectItem = Story & {
	group: string;
	translated: boolean;
};

export type BaseSelectProps<Multiple extends boolean = boolean> =
	AutocompleteProps<SelectItem, Multiple, false, false>;

export type SelectRenderValueCallback<Multiple extends boolean = boolean> =
	Defined<BaseSelectProps<Multiple>["renderValue"]>;
