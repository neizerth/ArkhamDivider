import { useCallback } from "react";
import { useAppSelector } from "@/shared/lib";
import { getPrintUnitPx } from "../logic";
import { selectDPI } from "../store/print";

export const usePrintPxCallback = () => {
	const dpi = useAppSelector(selectDPI);
	return useCallback(
		(mm: number) => {
			return getPrintUnitPx(mm, dpi);
		},
		[dpi],
	);
};
