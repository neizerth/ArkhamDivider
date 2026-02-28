import { Box, type BoxProps, Stack } from "@mui/material";
import { type RefObject, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useScrollSpy } from "@/shared/lib";
import type { IconGroup } from "../../model";

type IconSelectionNavProps = BoxProps & {
	iconGroups: IconGroup[];
	sectionRefs: RefObject<HTMLElement | null>[];
	scrollContainerRef: RefObject<HTMLDivElement | null>;
	onSectionClick?: (index: number) => void;
	activeSectionDefault?: number;
};

export function IconSelectionNav({
	iconGroups,
	sectionRefs,
	scrollContainerRef,
	activeSectionDefault = 0,
	onSectionClick,
	...props
}: IconSelectionNavProps) {
	const { t } = useTranslation();

	const activeSection = useScrollSpy({
		sectionElementRefs: sectionRefs,
		scrollingElement: scrollContainerRef,
		activeSectionDefault,
		offsetPx: 48,
	});

	const handleSectionClick = useCallback(
		(index: number) => () => {
			onSectionClick?.(index);
		},
		[onSectionClick],
	);

	return (
		<Box {...props}>
			<Stack component="nav" gap={0.5}>
				{iconGroups.map((group, index) => (
					<Box
						key={group.id}
						component="button"
						type="button"
						onClick={handleSectionClick(index)}
						sx={{
							py: 1,
							px: 2,
							textAlign: "left",
							border: "none",
							borderRadius: 1,
							cursor: "pointer",
							bgcolor:
								activeSection === index ? "action.selected" : "transparent",
							fontWeight: activeSection === index ? 600 : 400,
							"&:hover": { bgcolor: "action.hover" },
						}}
					>
						{t(group.name)}
					</Box>
				))}
			</Stack>
		</Box>
	);
}
