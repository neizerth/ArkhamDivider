import {
	type ReactVirtualizerOptions,
	useVirtualizer,
} from "@tanstack/react-virtual";
import { useBoundingRect } from "@/shared/lib";
import { LIST_GROUP_GAP } from "../../config";
import type { IconGroup } from "../../model";
import { useIconGroupHeight } from "./useIconGroupHeight";
import { useInitialScrollToIndex } from "./useInitialScrollToIndex";
import { useVirtualizedScrollToIndex } from "./useVirtualizedScrollToIndex";

type UseVirtualizerOptions = Partial<
	Omit<
		ReactVirtualizerOptions<HTMLDivElement, HTMLDivElement>,
		"getScrollElement" | "estimateSize" | "count"
	>
>;

type Options = UseVirtualizerOptions & {
	groups: IconGroup[];
	/** When set, scroll to this group index on mount (e.g. when modal opens). Uses estimated heights so it works before virtualizer has measured. */
	initialScrollIndex?: number;
	/** When true, initial scroll can run (e.g. modal is open). Pass so effect re-runs on every open. */
	initialScrollActive?: boolean;
};

export const useVirtualizedIconGroups = ({
	groups,
	initialScrollIndex,
	initialScrollActive = true,
	...options
}: Options) => {
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

	const scrollToIndex = useVirtualizedScrollToIndex({ virtualizer });

	useInitialScrollToIndex({
		initialScrollIndex,
		active: initialScrollActive,
		scrollToIndex,
	});

	return {
		virtualizer,
		scrollToIndex,
		scrollContainerRef,
	};
};
