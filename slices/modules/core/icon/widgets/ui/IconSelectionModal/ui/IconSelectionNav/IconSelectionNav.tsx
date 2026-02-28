import { Box, type BoxProps, Stack } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { IconGroup } from "../../model";

type IconSelectionNavProps = BoxProps & {
	iconGroups: IconGroup[];
	onSectionClick?: (index: number) => void;
	activeIndex?: number;
};

export function IconSelectionNav({
	iconGroups,
	activeIndex = 0,
	onSectionClick,
	...props
}: IconSelectionNavProps) {
	const { t } = useTranslation();

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
								activeIndex === index ? "action.selected" : "transparent",
							fontWeight: activeIndex === index ? 600 : 400,
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
