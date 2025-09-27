import type { SelectProps } from "@mui/material/Select";
import Select from "@mui/material/Select";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import type { AppSelector } from "@/shared/store";

type StoreSelectProps<T = unknown> = Omit<
	SelectProps<T>,
	"value" | "onChange"
> & {
	actionCreator: ActionCreatorWithPayload<T>;
	selector: AppSelector<T>;
};

export function StoreSelect<T = unknown>({
	actionCreator,
	selector,
	...props
}: StoreSelectProps<T>) {
	const value = useAppSelector(selector);
	const dispatch = useAppDispatch();

	const onChange = (value: T) => dispatch(actionCreator(value));

	return (
		<Select
			{...props}
			value={value}
			onChange={(event) => onChange(event.target.value as T)}
		/>
	);
}
