import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getPrintUnitPx } from "../logic";
import { selectDPI } from "../store/print";

export const usePrintPxCallback = () => {
	const dpi = useSelector(selectDPI);
	return useCallback(
		(mm: number) => {
			return getPrintUnitPx(mm, dpi);
		},
		[dpi],
	);
};
