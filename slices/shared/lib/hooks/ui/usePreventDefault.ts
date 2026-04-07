import memoize from "fast-memoize";
import { useCallback } from "react";
import type { GenericFunction } from "@/shared/model";

export const usePreventDefault = (callback: GenericFunction) => {
	return useCallback(
		memoize(
			(...args: unknown[]) =>
				<E extends { preventDefault: () => void }>(e: E) => {
					e.preventDefault();
					callback(...args);
				},
		),
		[],
	);
};
