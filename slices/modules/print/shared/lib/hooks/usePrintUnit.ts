import { useCallback } from "react";
import { useAppSelector } from "@/shared/lib";
import type { PrintUnitCallback } from "../../model";
import { getPrintUnit } from "../logic";
import { selectDPI } from "../store";

export const usePrintSx = (params?: object) => {
	const dpi = useAppSelector(selectDPI);
	return useCallback(
		<T>(callbackSx: PrintUnitCallback<T>) => {
			const input = (mm: number) => {
				const px = getPrintUnit(mm, dpi);
				return `${px}px`;
			};
			return callbackSx({
				...params,
				mm: input,
				dpi,
			});
		},
		[dpi, params],
	);
};
