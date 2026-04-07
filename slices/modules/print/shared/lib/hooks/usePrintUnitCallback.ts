import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getPrintUnit } from "../logic";
import { selectDPI } from "../store/print";

export const usePrintUnitCallback = () => {
	const dpi = useSelector(selectDPI);
	return useCallback(
		(mm: number) => {
			return getPrintUnit(mm, dpi);
		},
		[dpi],
	);
};
