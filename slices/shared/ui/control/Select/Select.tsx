import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem, { type MenuItemProps } from "@mui/material/MenuItem";
import MuiSelect, {
	type SelectProps as MuiSelectProps,
} from "@mui/material/Select";
import type { SxProps, Theme } from "@mui/material/styles";
import { isString } from "ramda-adjunct";
import { type ReactNode, useId } from "react";
import { Icon } from "@/modules/core/icon/shared/ui";
import { Row } from "../../layout";

export type SelectItem = {
	id: string;
	icon?: ReactNode;
	label: string;
	value: MenuItemProps["value"];
};

export type SelectProps = MuiSelectProps & {
	data: SelectItem[];
	containerSx?: SxProps<Theme>;
};

export function Select({ label, data, containerSx, ...props }: SelectProps) {
	const id = useId();
	return (
		<FormControl sx={containerSx}>
			<InputLabel id={id}>{label}</InputLabel>
			<MuiSelect {...props} labelId={id} label={label}>
				{data.map((item) => (
					<MenuItem key={item.id} value={item.value}>
						<Row gap={1} alignItems="center" color="text.secondary">
							{item.icon &&
								(isString(item.icon) ? <Icon icon={item.icon} /> : item.icon)}
							{item.label}
						</Row>
					</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	);
}
