import { Box, type BoxProps, Stack } from "@mui/material";
import type { RefObject } from "react";
import { forwardRef, memo, useCallback, useEffect, useRef } from "react";
import { useVirtualizedIconGroups } from "../../lib";
import type { IconGroup, IconSelectionSectionRef } from "../../model";
import { IconSelectionGroup } from "../IconSelectionGroup";

type IconSelectionListProps = BoxProps & {
	iconGroups: IconGroup[];
	sectionRefs: IconSelectionSectionRef[];
	/** Ref контейнера скролла — заполняется при монтировании (для Nav/scroll spy) */
	scrollContainerRef?: RefObject<HTMLDivElement | null>;
	/** Ref для scrollToIndex — заполняется списком для скролла к группе по умолчанию */
	scrollToIndexRef?: RefObject<((index: number) => void) | null>;
};

const IconSelectionListComponent = forwardRef<
	HTMLDivElement,
	IconSelectionListProps
>(function IconSelectionListComponent(
	{ iconGroups, sectionRefs, scrollContainerRef, scrollToIndexRef, ...props },
	ref,
) {
	const scrollRef = useRef<HTMLDivElement | null>(null);

	const setScrollRef = useCallback(
		(el: HTMLDivElement | null) => {
			scrollRef.current = el;
			if (scrollContainerRef) {
				scrollContainerRef.current = el;
			}
		},
		[scrollContainerRef],
	);

	const { virtualizer, scrollToIndex } = useVirtualizedIconGroups({
		containerRef: scrollRef,
		groups: iconGroups,
	});

	useEffect(() => {
		if (!scrollToIndexRef) {
			return;
		}
		scrollToIndexRef.current = scrollToIndex;
		return () => {
			scrollToIndexRef.current = null;
		};
	}, [scrollToIndexRef, scrollToIndex]);

	const virtualItems = virtualizer.getVirtualItems();
	const firstItem = virtualItems[0];
	const lastItem = virtualItems[virtualItems.length - 1];
	const totalSize = virtualizer.getTotalSize();
	const paddingTop = firstItem?.start ?? 0;
	const paddingBottom = lastItem ? totalSize - lastItem.end : 0;

	return (
		<Box ref={ref} {...props}>
			<Box borderRadius={1} overflow="hidden">
				<Box
					ref={setScrollRef}
					sx={{
						maxHeight: "calc(100vh - 10rem)",
						overflow: "auto",

						paddingRight: {
							sm: 2,
						},
					}}
				>
					<Stack
						sx={{
							minHeight: totalSize,
							width: "100%",
						}}
					>
						{paddingTop > 0 && (
							<Box component="div" sx={{ height: paddingTop, width: "100%" }} />
						)}
						{virtualItems.map((virtualRow) => {
							const group = iconGroups[virtualRow.index];
							const ref = sectionRefs[virtualRow.index];

							const handleGroupRef = (el: HTMLDivElement | null) => {
								virtualizer.measureElement(el as HTMLDivElement | undefined);
								if (ref && el) {
									ref.current = el;
								}
							};

							return (
								<Box
									key={group.id}
									ref={handleGroupRef}
									data-index={virtualRow.index}
									sx={{ width: "100%", pb: 1 }}
								>
									<IconSelectionGroup group={group} />
								</Box>
							);
						})}
						{paddingBottom > 0 && (
							<Box sx={{ height: paddingBottom, width: "100%" }} />
						)}
					</Stack>
				</Box>
			</Box>
		</Box>
	);
});

export const IconSelectionList = memo(IconSelectionListComponent);
