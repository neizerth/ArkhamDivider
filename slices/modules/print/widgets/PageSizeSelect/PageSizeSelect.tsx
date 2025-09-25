import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { pageSizeFormats } from "../../shared/config";
import type { PageFormatType } from "../../shared/model";
import * as C from "./PageSizeSelect.components";

type PageSizeSelectProps = FormControlProps;

export function PageSizeSelect(props: PageSizeSelectProps) {
	const { t } = useTranslation();
	const id = useId();

	const label = t(`Page Size`);

	return (
		<FormControl {...props}>
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				labelId={id}
				label={label}
				renderValue={(value: PageFormatType) => {
					const format = pageSizeFormats.find((f) => f.type === value);
					return format?.name || value;
				}}
				sx={{
					width: "100%",
				}}
			>
				{pageSizeFormats.map((format) => (
					<MenuItem key={format.type} value={format.type} sx={{ gap: 1 }}>
						<C.Item>
							<C.Label>{format.name}</C.Label>
							<C.Size>
								{format.size.mm.width} x {format.size.mm.height}mm
							</C.Size>
						</C.Item>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
