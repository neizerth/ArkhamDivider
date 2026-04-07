import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { AppSelector } from "@/shared/store";
import { useAppSelector } from "../useAppSelector";
import { useDispatchAction } from "./useDispatchAction";

type Options = {
	actionCreator: ActionCreatorWithPayload<boolean>;
	selector: AppSelector<boolean>;
};

export function useBooleanAction({ actionCreator, selector }: Options) {
	const setValue = useDispatchAction(actionCreator);
	const value = useAppSelector(selector);

	return {
		set: (value: boolean) => setValue(value),
		on: () => setValue(true),
		off: () => setValue(false),
		toggle: () => setValue(!value),
	};
}
