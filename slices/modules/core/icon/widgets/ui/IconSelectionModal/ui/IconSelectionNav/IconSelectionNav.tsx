import CloseIcon from "@mui/icons-material/Close";
import { Box, type BoxProps, IconButton, Stack } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { IconGroup } from "../../model";

type IconSelectionNavProps = BoxProps & {
	iconGroups: IconGroup[];
	onSectionClick?: (index: number) => void;
	onClose?: () => void;
	activeIndex?: number;
};

export function IconSelectionNav({
	iconGroups,
	activeIndex = 0,
	onSectionClick,
	onClose,
	sx,
	...props
}: IconSelectionNavProps) {
	const { t } = useTranslation();
	const buttonRefs = useRef<(HTMLElement | null)[]>([]);

	const handleSectionClick = useCallback(
		(index: number) => () => {
			onSectionClick?.(index);
		},
		[onSectionClick],
	);

	useEffect(() => {
		const el = buttonRefs.current[activeIndex];
		el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
	}, [activeIndex]);

	return (
		<Box
			{...props}
			sx={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				minHeight: 0,
				overflow: "hidden",
				position: "relative",
				borderRadius: 1,
				padding: 1,
				height: "100%",
			}}
		>
			{onClose && (
				<Box
					sx={{
						display: { xs: "flex", sm: "none" },
						mb: 1,
						justifyContent: "flex-end",
					}}
				>
					<IconButton
						onClick={onClose}
						aria-label={t`Close`}
						size="small"
						sx={{ p: 1 }}
					>
						<CloseIcon />
					</IconButton>
				</Box>
			)}
			<Box
				sx={{
					overflow: "auto",

					position: {
						xs: "static",
						sm: "absolute",
					},
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				}}
			>
				<Box>
					<Stack component="nav" gap={1}>
						{iconGroups.map((group, index) => (
							<Box
								key={group.id}
								component="button"
								type="button"
								ref={(el: HTMLElement | null) => {
									buttonRefs.current[index] = el;
								}}
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
			</Box>
		</Box>
	);
}
