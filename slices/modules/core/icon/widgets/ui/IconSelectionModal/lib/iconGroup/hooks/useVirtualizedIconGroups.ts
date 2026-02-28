import {
	type ReactVirtualizerOptions,
	useVirtualizer,
} from "@tanstack/react-virtual";
import { type RefObject, useCallback } from "react";
import { useBoundingRect } from "@/shared/lib";
import { GROUP_HEADER_HEIGHT, LIST_GROUP_GAP } from "../../../config";
import type { IconGroup } from "../../../model";
import { useIconGroupHeight } from "./useIconGroupHeight";

type UseVirtualizerOptions = Partial<
	Omit<
		ReactVirtualizerOptions<HTMLDivElement, HTMLDivElement>,
		"getScrollElement" | "estimateSize" | "count"
	>
>;

type Options = UseVirtualizerOptions & {
	containerRef: RefObject<HTMLDivElement | null>;
	groups: IconGroup[];
};

export const useVirtualizedIconGroups = ({
	containerRef,
	groups,
	...options
}: Options) => {
	const [_, rect] = useBoundingRect(containerRef);
	const containerWidth = rect?.width ?? 0;

	const getGroupHeight = useIconGroupHeight({ containerWidth });

	const count = groups.length;

	const virtualizer = useVirtualizer({
		...options,
		count,
		getScrollElement: () => containerRef.current,
		estimateSize: (index) => {
			const group = groups[index];
			return getGroupHeight(group) + LIST_GROUP_GAP;
		},
	});

	const scrollToIndex = useCallback(
		(index: number) => {
			const offsetInfo = virtualizer.getOffsetForIndex(index, "start");

			if (offsetInfo) {
				const [offset] = offsetInfo;
				const nudge = offset - GROUP_HEADER_HEIGHT;
				const scrollOffset = Math.max(0, nudge);
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

	return {
		virtualizer,
		scrollToIndex,
	};
};
