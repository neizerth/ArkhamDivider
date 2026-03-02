import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	type BoxProps,
	IconButton,
	Stack,
	type SxProps,
	useTheme,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { IconGroup } from "../../model";
import {
	getButtonSx,
	getContainerSx,
	getScrollContainerSx,
} from "./IconSelectionNav.styles";

const SCROLL_SHADOW_THRESHOLD = 4;

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
	const theme = useTheme();
	const buttonRefs = useRef<(HTMLElement | null)[]>([]);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [scrollShadows, setScrollShadows] = useState({
		top: false,
		bottom: false,
	});

	const updateScrollShadows = useCallback(() => {
		const el = scrollRef.current;
		if (!el) {
			return;
		}
		const { scrollTop, scrollHeight, clientHeight } = el;
		const canScrollUp = scrollTop > SCROLL_SHADOW_THRESHOLD;
		const canScrollDown =
			scrollTop + clientHeight < scrollHeight - SCROLL_SHADOW_THRESHOLD;
		setScrollShadows((prev) =>
			prev.top !== canScrollUp || prev.bottom !== canScrollDown
				? { top: canScrollUp, bottom: canScrollDown }
				: prev,
		);
	}, []);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) {
			return;
		}
		updateScrollShadows();
		const observer = new ResizeObserver(updateScrollShadows);
		observer.observe(el);
		el.addEventListener("scroll", updateScrollShadows, { passive: true });
		return () => {
			observer.disconnect();
			el.removeEventListener("scroll", updateScrollShadows);
		};
	}, [updateScrollShadows]);

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

	const scrollContainerSx = getScrollContainerSx({
		theme,
		scrollShadows,
	});

	const containerSx = {
		...getContainerSx({ theme }),
		...sx,
	} as SxProps;

	return (
		<Box {...props} sx={sx}>
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
			<Box ref={scrollRef} sx={scrollContainerSx}>
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
								sx={getButtonSx(activeIndex === index)}
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
