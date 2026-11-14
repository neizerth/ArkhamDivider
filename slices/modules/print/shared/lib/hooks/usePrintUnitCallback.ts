import { useCallback } from "react";
import { useAppSelector } from "@/shared/lib";
import { getPrintUnit } from "../logic";
import { selectDPI } from "../store/print";

export const usePrintUnitCallback = () => {
	const dpi = useAppSelector(selectDPI);
	return useCallback(
		(mm: number) => {
			return getPrintUnit(mm, dpi);
		},
		[dpi],
	);
};
