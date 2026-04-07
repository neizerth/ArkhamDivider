import { useMemo } from "react";
import { useBoundingRect } from "@/shared/lib";

type Options<T extends HTMLElement> = {
	width: number;
	ref?: React.RefObject<T>;
};

export const usePrintUnitByRect = <T extends HTMLElement>({
	width,
	ref: refProp,
}: Options<T>) => {
	const [ref, rect] = useBoundingRect(refProp);

	const mmSize = (rect?.width ?? 0) / width;

	const calc = useMemo(() => {
		function calc(value: number) {
			const px = mmSize * value;
			return `${px}px`;
		}
		calc.valueOf = (value: number) => {
			return mmSize * value;
		};
		return calc;
	}, [mmSize]);

	return { mm: calc, mmSize, ref } as const;
};
