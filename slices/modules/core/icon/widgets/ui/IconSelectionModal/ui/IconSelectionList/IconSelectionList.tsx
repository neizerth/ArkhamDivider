import { Box, type BoxProps, Stack } from "@mui/material";
import type { Virtualizer } from "@tanstack/react-virtual";
import type { RefObject } from "react";
import type { IconGroup, IconSelectionSectionRef } from "../../model";
import { IconSelectionGroup } from "../IconSelectionGroup";

type RefElement = HTMLDivElement | null;

type IconSelectionListProps = BoxProps & {
	iconGroups: IconGroup[];
	sectionRefs: IconSelectionSectionRef[];
	scrollContainerRef?: RefObject<RefElement>;
	virtualizer: Virtualizer<HTMLDivElement, HTMLDivElement>;
	onSectionHeaderClick?: (index: number) => void;
	onSectionSubgroupHeaderClick?: (
		groupIndex: number,
		subgroupIndex: number,
	) => void;
	ref?: React.Ref<HTMLDivElement>;
};

function IconSelectionListComponent({
	iconGroups,
	sectionRefs,
	scrollContainerRef,
	virtualizer,
	onSectionHeaderClick,
	onSectionSubgroupHeaderClick,
	ref,
	...props
}: IconSelectionListProps) {
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
					ref={scrollContainerRef}
					sx={{
						minHeight: 200,
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
							const sectionRef = sectionRefs[virtualRow.index];

							const handleGroupRef = (el: RefElement) => {
								virtualizer.measureElement(el);
								if (sectionRef && el) {
									sectionRef.current = el;
								}
							};

							const handleHeaderClick = () => {
								onSectionHeaderClick?.(virtualRow.index);
							};

							const handleGroupHeaderClick = (subgroupIndex: number) => {
								onSectionSubgroupHeaderClick?.(virtualRow.index, subgroupIndex);
							};

							return (
								<Box
									key={group.id}
									ref={handleGroupRef}
									data-index={virtualRow.index}
									sx={{ width: "100%", pb: 1 }}
								>
									<IconSelectionGroup
										group={group}
										onHeaderClick={handleHeaderClick}
										onGroupHeaderClick={handleGroupHeaderClick}
									/>
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

export const IconSelectionList = IconSelectionListComponent;
