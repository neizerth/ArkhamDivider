import type { SwitchProps } from "@mui/material/Switch";
import Switch from "@mui/material/Switch";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import type { AppSelector } from "@/shared/store";

type StoreSwitchProps = Omit<SwitchProps, "checked" | "onChange"> & {
	actionCreator: ActionCreatorWithPayload<boolean>;
	selector: AppSelector<boolean>;
};

export function StoreSwitch({
	actionCreator,
	selector,
	...props
}: StoreSwitchProps) {
	const value = useAppSelector(selector);
	const dispatch = useAppDispatch();

	const toggle = () => dispatch(actionCreator(!value));

	return <Switch {...props} checked={value} onChange={toggle} />;
}
