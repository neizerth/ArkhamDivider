import { useCallback } from "react";
import { useAppSelector } from "@/shared/lib";
import { selectDividerParam } from "../store";
import { useDividerParam } from "./useDividerParam";

type Options = {
	dividerId: string;
	sizes: unknown[];
	tabSize?: unknown;
};

export const useTabSize = ({ dividerId, sizes, tabSize }: Options) => {
	const currentSize = useAppSelector(
		selectDividerParam({ id: dividerId, key: "tabSize" }),
	);
	const size = currentSize ?? tabSize;

	const sizeIndex = sizes.indexOf(size);
	const nextSize = sizes[(sizeIndex + 1) % sizes.length];
	const prevSize = sizes[(sizeIndex - 1 + sizes.length) % sizes.length];

	const canEnlarge = sizeIndex < sizes.length - 1;
	const canShrink = sizeIndex > 0;

	const setTabSize = useDividerParam({
		dividerId,
		key: "tabSize",
	});

	const enlarge = useCallback(() => {
		if (!canEnlarge) {
			return;
		}
		setTabSize(nextSize);
	}, [setTabSize, nextSize, canEnlarge]);

	const shrink = useCallback(() => {
		if (!canShrink) {
			return;
		}
		setTabSize(prevSize);
	}, [setTabSize, prevSize, canShrink]);

	return {
		tabSize,
		enlarge,
		shrink,
		canEnlarge,
		canShrink,
	};
};
