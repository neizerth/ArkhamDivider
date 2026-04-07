import type { Virtualizer } from "@tanstack/react-virtual";
import { useCallback } from "react";

type Options = {
	virtualizer: Virtualizer<HTMLDivElement, HTMLDivElement>;
};

export function useVirtualizedScrollToIndex({
	virtualizer,
}: Options): (index: number) => void {
	return useCallback(
		(index: number) => {
			const offsetInfo = virtualizer.getOffsetForIndex(index, "start");

			if (offsetInfo) {
				const [offset] = offsetInfo;
				const scrollPadding = 0;
				const scrollOffset = Math.max(0, offset - scrollPadding);
				virtualizer.scrollToOffset(scrollOffset, { behavior: "auto" });
				return;
			}

			virtualizer.scrollToIndex(index, {
				behavior: "auto",
				align: "start",
			});
		},
		[virtualizer],
	);
}
