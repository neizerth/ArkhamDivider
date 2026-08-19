import { useCallback } from "react";
import { useAppDispatch } from "@/shared/lib";
import { setDividerParam } from "../store";

export type UseDividerParamOptions = {
	dividerId: string;
	key: string;
};

export const useDividerParam = <T = unknown>({
	dividerId,
	key,
}: UseDividerParamOptions) => {
	const dispatch = useAppDispatch();

	return useCallback(
		(value: T) => {
			dispatch(setDividerParam({ id: dividerId, key, value }));
		},
		[dispatch, dividerId, key],
	);
};
