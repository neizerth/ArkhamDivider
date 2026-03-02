import {
	type ReactVirtualizerOptions,
	useVirtualizer,
} from "@tanstack/react-virtual";
import { useCallback } from "react";
import { useBoundingRect } from "@/shared/lib";
import { LIST_GROUP_GAP } from "../../config";
import type { IconGroup } from "../../model";
import { useIconGroupHeight } from "./useIconGroupHeight";

type UseVirtualizerOptions = Partial<
	Omit<
		ReactVirtualizerOptions<HTMLDivElement, HTMLDivElement>,
		"getScrollElement" | "estimateSize" | "count"
	>
>;

type Options = UseVirtualizerOptions & {
	groups: IconGroup[];
};

export const useVirtualizedIconGroups = ({ groups, ...options }: Options) => {
	const [scrollContainerRef, rect] = useBoundingRect<HTMLDivElement>();

	const containerWidth = rect?.width ?? 0;

	const getGroupHeight = useIconGroupHeight({ containerWidth });

	const count = groups.length;

	const virtualizer = useVirtualizer({
		...options,
		count,
		getScrollElement: () => scrollContainerRef.current,
		estimateSize: (index) => {
			const group = groups[index];
			const height = getGroupHeight(group) + LIST_GROUP_GAP;
			return height;
		},
	});

	const scrollToIndex = useCallback(
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

	return {
		virtualizer,
		scrollToIndex,
		scrollContainerRef,
	};
};
