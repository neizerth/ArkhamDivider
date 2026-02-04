import type { SxProps } from "@mui/material/styles";
import { useCallback } from "react";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getLocaleConfig, selectCurrentLanguage } from "../../../shared/lib";
import type { LocaleSxCallback } from "../../../shared/model";

export const useLocaleSx = (params?: object) => {
	const locale = useAppSelector(selectCurrentLanguage);
	const getLocaleSx = usePrintSx(params);

	return useCallback(
		(callbackSx: LocaleSxCallback) => {
			const localeSx = getLocaleSx(callbackSx);
			return getLocaleConfig(locale, localeSx) as SxProps;
		},
		[locale, getLocaleSx],
	);
};
