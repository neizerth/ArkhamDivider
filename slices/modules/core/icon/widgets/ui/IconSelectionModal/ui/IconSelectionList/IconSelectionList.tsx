import { Box, type BoxProps, Stack } from "@mui/material";
import type { IconGroup, IconSelectionSectionRef } from "../../model";
import { IconSelectionGroup } from "../IconSelectionGroup";

type IconSelectionListProps = BoxProps & {
	iconGroups: IconGroup[];
	sectionRefs: IconSelectionSectionRef[];
};

export function IconSelectionList({
	iconGroups,
	sectionRefs,
	...props
}: IconSelectionListProps) {
	return (
		<Box {...props}>
			<Box paddingRight={2} maxHeight="calc(100vh - 10rem)" overflow="auto">
				<Stack gap={1}>
					{iconGroups.map((group, index) => (
						<IconSelectionGroup
							key={group.id}
							ref={sectionRefs[index]}
							group={group}
						/>
					))}
				</Stack>
			</Box>
		</Box>
	);
}
