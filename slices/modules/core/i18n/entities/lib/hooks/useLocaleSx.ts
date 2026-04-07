import type { SxProps } from "@mui/material/styles";
import { useCallback } from "react";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getLocaleConfig, selectCurrentLanguage } from "../../../shared/lib";
import type { LocaleSxCallback } from "../../../shared/model";

export const useLocaleSx = <T = object>(params?: T) => {
	const locale = useAppSelector(selectCurrentLanguage);
	const getLocaleSx = usePrintUnit(params);

	return useCallback(
		<P = void>(
			callbackSx: LocaleSxCallback<T & NoInfer<P>>,
			customProps?: P,
		) => {
			const localeSx = getLocaleSx(callbackSx, customProps);
			return getLocaleConfig(locale, localeSx) as SxProps;
		},
		[locale, getLocaleSx],
	);
};
