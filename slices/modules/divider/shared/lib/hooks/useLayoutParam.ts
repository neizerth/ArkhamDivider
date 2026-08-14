import { useCallback } from "react";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { selectLayoutId, setLayoutParam } from "../store";

export type UseLayoutParamOptions = {
	layoutId?: string;
	locale?: string;
	key: string;
};

export const useLayoutParam = <T = unknown>(options: UseLayoutParamOptions) => {
	const dispatch = useAppDispatch();
	const currentLocale = useAppSelector(selectCurrentLanguage);
	const currentLayoutId = useAppSelector(selectLayoutId);
	const { layoutId = currentLayoutId, key } = options;
	const locale = options.locale ?? currentLocale;

	return useCallback(
		(value: T) => {
			if (!layoutId) {
				return;
			}
			dispatch(setLayoutParam({ layoutId, key, value, locale }));
		},
		[dispatch, layoutId, key, locale],
	);
};
