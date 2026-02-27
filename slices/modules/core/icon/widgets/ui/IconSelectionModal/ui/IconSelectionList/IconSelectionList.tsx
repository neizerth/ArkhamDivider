import { Box, type BoxProps, Stack } from "@mui/material";
import { memo, useRef } from "react";
import { useIconGroups, useVirtualizedIconGroups } from "../../lib";
import type { IconGroup, IconSelectionSectionRef } from "../../model";
import { IconSelectionGroup } from "../IconSelectionGroup";

type IconSelectionListProps = BoxProps & {
	iconGroups: IconGroup[];
	sectionRefs: IconSelectionSectionRef[];
};

function IconSelectionListComponent({
	iconGroups,
	sectionRefs,
	...props
}: IconSelectionListProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	const groups = useIconGroups();

	const virtualizer = useVirtualizedIconGroups({
		containerRef: scrollRef,
		groups,
	});

	const virtualItems = virtualizer.getVirtualItems();
	const firstItem = virtualItems[0];
	const lastItem = virtualItems[virtualItems.length - 1];
	const totalSize = virtualizer.getTotalSize();
	const paddingTop = firstItem?.start ?? 0;
	const paddingBottom = lastItem ? totalSize - lastItem.end : 0;

	return (
		<Box {...props}>
			<Box borderRadius={1} overflow="hidden">
				<Box
					ref={scrollRef}
					sx={{
						maxHeight: "calc(100vh - 10rem)",
						overflow: "auto",

						paddingRight: {
							md: 2,
						},
					}}
				>
					<Stack
						sx={{
							minHeight: totalSize,
							width: "100%",
						}}
						gap={1}
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
									sx={{ width: "100%" }}
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
}

export const IconSelectionList = memo(IconSelectionListComponent);
