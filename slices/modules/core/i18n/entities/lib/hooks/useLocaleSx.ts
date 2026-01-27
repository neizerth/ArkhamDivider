import { useCallback } from "react";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { selectLanguage } from "../../../shared/lib";
import type { LocaleSxCallback } from "../../../shared/model";

export const useLocaleSx = (params?: object) => {
	const locale = useAppSelector(selectLanguage);
	const getLocaleSx = usePrintSx(params);

	return useCallback(
		(callbackSx: LocaleSxCallback) => {
			const localeSx = getLocaleSx(callbackSx);
			const defaultSx = localeSx.default;
			const sx = localeSx[locale];
			return {
				...defaultSx,
				...sx,
			};
		},
		[locale, getLocaleSx],
	);
};
