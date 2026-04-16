import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectProps } from "@mui/material/Select";
import type { TFunction } from "i18next";
import { useCallback, useId } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import {
	selectPagePadding,
	setPagePadding,
} from "../../../shared/lib/store/print";

type PagePaddingValue = number | null;
type PagePaddingSelectValue = number | "";

type PagePaddingSelectProps = SelectProps<PagePaddingSelectValue> & {
	containerProps?: FormControlProps;
};

const options: Array<{ value: PagePaddingSelectValue }> = [
	{ value: 0 },
	{ value: 5 },
	{ value: 10 },
	{ value: 20 },
];

const renderPagePaddingValue =
	(t: TFunction) => (value: PagePaddingSelectValue) => {
		if (!value) {
			return t`None`;
		}
		return `${value} ${t`mm`}`;
	};

export function PagePaddingSelect({
	containerProps,
	...props
}: PagePaddingSelectProps) {
	const { t } = useTranslation();
	const id = useId();
	const dispatch = useAppDispatch();
	const pagePadding = useAppSelector(selectPagePadding);

	const label = t(`Page padding`);

	const handleChange = (value: PagePaddingValue) => {
		dispatch(setPagePadding(value));
	};

	const renderValue = useCallback(renderPagePaddingValue(t), []);

	return (
		<FormControl {...containerProps}>
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				{...props}
				labelId={id}
				label={label}
				value={pagePadding ?? ""}
				onChange={(event) => {
					const value = event.target.value as PagePaddingSelectValue;
					handleChange(value === "" ? null : value);
				}}
				renderValue={renderValue}
				sx={{
					width: "100%",
				}}
			>
				{options.map((o) => (
					<MenuItem key={String(o.value)} value={o.value}>
						{renderValue(o.value)}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
