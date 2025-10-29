import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem, { type MenuItemProps } from "@mui/material/MenuItem";
import MuiSelect, {
	type SelectProps as MuiSelectProps,
} from "@mui/material/Select";
import { useId } from "react";

export type SelectItem = {
	id: string;
	label: string;
	value: MenuItemProps["value"];
};

export type SelectProps = MuiSelectProps & {
	data: SelectItem[];
};

export function Select({ label, data, sx, ...props }: SelectProps) {
	const id = useId();
	return (
		<FormControl sx={sx}>
			<InputLabel id={id}>{label}</InputLabel>
			<MuiSelect
				{...props}
				labelId={id}
				label={label}
				sx={{
					width: "100%",
				}}
			>
				{data.map((item) => (
					<MenuItem key={item.id} value={item.value} sx={{ gap: 1 }}>
						<ListItemText>{item.label}</ListItemText>
					</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	);
}
