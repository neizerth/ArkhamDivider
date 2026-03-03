import { useCallback } from "react";
import { useAppSelector } from "@/shared/lib";
import type { PrintUnitCallback, PrintUnitProps } from "../../model";
import { getPrintUnit } from "../logic";
import { selectDPI } from "../store";

export const usePrintUnit = <Input>(params?: Input) => {
	const dpi = useAppSelector(selectDPI);
	return useCallback(
		<T>(callbackSx: PrintUnitCallback<T, Input>) => {
			const input = (mm: number) => {
				const px = getPrintUnit(mm, dpi);
				return `${px}px`;
			};
			const props: PrintUnitProps<Input> = {
				...(params ?? ({} as Input)),
				mm: input,
				dpi,
			};
			return callbackSx(props);
		},
		[dpi, params],
	);
};
