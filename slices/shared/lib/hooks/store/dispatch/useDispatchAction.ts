import type { Action, ActionCreator } from "@reduxjs/toolkit";
import { useAppDispatch } from "../useAppDispatch";

export function useDispatchAction<A extends Action, P extends unknown[]>(
	actionCreator: ActionCreator<A, P>,
) {
	const dispatch = useAppDispatch();
	return (...args: P) => {
		dispatch(actionCreator(...args));
	};
}
