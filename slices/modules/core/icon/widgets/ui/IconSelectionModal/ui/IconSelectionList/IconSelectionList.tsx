import { Box, type BoxProps, Stack } from "@mui/material";
import type { Virtualizer } from "@tanstack/react-virtual";
import { type RefObject, useEffect } from "react";
import type { IconGroup, IconSelectionSectionRef } from "../../model";
import { IconSelectionGroup } from "../IconSelectionGroup";

type IconSelectionListProps = BoxProps & {
	iconGroups: IconGroup[];
	sectionRefs: IconSelectionSectionRef[];
	scrollContainerRef?: RefObject<HTMLDivElement | null>;
	onScrollContainerMount?: () => void;
	virtualizer: Virtualizer<HTMLDivElement, HTMLDivElement>;
	ref?: React.Ref<HTMLDivElement>;
};

function IconSelectionListComponent({
	iconGroups,
	sectionRefs,
	scrollContainerRef,
	onScrollContainerMount,
	virtualizer,
	ref,
	...props
}: IconSelectionListProps) {
	useEffect(() => {
		onScrollContainerMount?.();
	}, [onScrollContainerMount]);

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

							const handleGroupRef = (el: HTMLDivElement | null) => {
								virtualizer.measureElement(el as HTMLDivElement | undefined);
								if (sectionRef && el) {
									(sectionRef as { current: HTMLDivElement | null }).current =
										el;
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
}

export const IconSelectionList = IconSelectionListComponent;
