import { useMemo } from "react";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { selectLanguage } from "../../../shared/lib";
import type { LocaleSxCallback } from "../../../shared/model";

export const useLocaleSx = (callbackSx: LocaleSxCallback, params?: object) => {
	const locale = useAppSelector(selectLanguage);
	const localeSx = usePrintSx(callbackSx, params);
	return useMemo(() => {
		const defaultSx = localeSx.default;
		const sx = localeSx[locale];
		return {
			...defaultSx,
			...sx,
		};
	}, [locale, localeSx]);
};
