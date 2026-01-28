import { useCallback } from "react";
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

	const size = (rect?.width ?? 0) / width;

	const calc = useCallback(
		(value: number) => {
			const px = size * value;
			return `${px}px`;
		},
		[size],
	);

	return { mm: calc, size, ref } as const;
};
