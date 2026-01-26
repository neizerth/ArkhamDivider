import { useMemo } from "react";
import { useAppSelector } from "@/shared/lib";
import type { PrintUnitCallback } from "../../model";
import { getPrintUnit } from "../logic";
import { selectDPI } from "../store";

export const usePrintSx = <T>(
	callbackSx: PrintUnitCallback<T>,
	params?: object,
) => {
	const dpi = useAppSelector(selectDPI);
	return useMemo(() => {
		const input = (mm: number) => {
			const px = getPrintUnit(mm, dpi);
			return `${px}px`;
		};
		return callbackSx({
			...params,
			mm: input,
			dpi,
		});
	}, [dpi, callbackSx, params]);
};
