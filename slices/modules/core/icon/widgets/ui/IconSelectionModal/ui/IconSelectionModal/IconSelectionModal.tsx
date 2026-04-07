import { Box, Button, Dialog, DialogActions, Grid, Stack } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { absoluteFill } from "@/shared/config";
import { useScrollSpy } from "@/shared/lib";
import { useBoolean } from "@/shared/lib/hooks/common";
import { Row } from "@/shared/ui";
import { Icon, IconSelectionContext } from "../../../../../shared/ui";
import {
	findGroupIndexByIcon,
	useIconGroupSectionRefs,
	useIconGroups,
	useVirtualizedIconGroups,
} from "../../lib";
import { IconSelectionList } from "../IconSelectionList";
import { IconSelectionNav } from "../IconSelectionNav";
import { IconSelectionPreview } from "../IconSelectionPreview";
import { contentSx, getSidebarSx } from "./IconSelectionModal.styles";

export function IconSelectionModal() {
	const { t } = useTranslation();
	const {
		defaultIcon,
		selectedIcon,
		selectionActive,
		onSelectRef,
		setSelectionActive,
		select,
		reset,
	} = useContext(IconSelectionContext);
	const open = selectionActive;
	const isDefaultIcon = defaultIcon === selectedIcon;
	const prevOpenRef = useRef(open);
	const openedNow = open && !prevOpenRef.current;

	useEffect(() => {
		prevOpenRef.current = open;
	}, [open]);

	const listSectionRef = useRef<HTMLDivElement>(null);

	const [navActive, setNavActive] = useBoolean(false);

	const iconGroups = useIconGroups();
	const sectionRefs = useIconGroupSectionRefs(iconGroups);

	const defaultSectionIndex = useMemo(
		() => findGroupIndexByIcon(iconGroups, selectedIcon ?? defaultIcon),
		[iconGroups, defaultIcon, selectedIcon],
	);

	const { virtualizer, scrollToIndex, scrollContainerRef } =
		useVirtualizedIconGroups({
			groups: iconGroups,
			initialScrollIndex: openedNow ? defaultSectionIndex : undefined,
			initialScrollActive: openedNow,
		});

	const activeIndex = useScrollSpy({
		sectionElementRefs: sectionRefs.current,
		scrollingElement: scrollContainerRef,
		activeSectionDefault: defaultSectionIndex,
		offsetPx: 48,
	});

	const onClose = useCallback(() => {
		setSelectionActive(false);
		onSelectRef.current = null;
	}, [onSelectRef, setSelectionActive]);

	const handleSectionClick = useCallback(
		(index: number) => {
			setNavActive.off();
			requestAnimationFrame(() => {
				requestAnimationFrame(() => scrollToIndex(index));
			});
		},
		[scrollToIndex, setNavActive],
	);

	const sidebarSx = getSidebarSx(navActive);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			slotProps={{
				paper: {
					sx: {
						display: "flex",
						flexDirection: "column",
						height: "calc(100vh - 4rem)",
						maxHeight: "100vh",
					},
				},
			}}
		>
			<Box
				sx={{
					flex: 1,
					minHeight: 0,
					overflow: "hidden",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Grid container padding={2} position="relative" sx={contentSx}>
					<Grid
						size={{
							xs: 12,
							sm: 7,
							md: 8,
						}}
						sx={{
							filter: {
								xs: navActive ? "blur(10px)" : "none",
								sm: "none",
							},
							transition: "filter 0.2s ease",
						}}
					>
						<IconSelectionList
							key={String(open)}
							iconGroups={iconGroups}
							sectionRefs={sectionRefs.current}
							scrollContainerRef={scrollContainerRef}
							onSectionHeaderClick={setNavActive.on}
							onSectionSubgroupHeaderClick={setNavActive.on}
							virtualizer={virtualizer}
							ref={listSectionRef}
						/>
					</Grid>
					<Grid
						size={{
							xs: 12,
							sm: 5,
							md: 4,
						}}
						sx={sidebarSx}
					>
						<Stack gap={2} sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
							<IconSelectionPreview display={{ xs: "none", sm: "block" }} />
							<IconSelectionNav
								iconGroups={iconGroups}
								onSectionClick={handleSectionClick}
								onClose={setNavActive.off}
								activeIndex={activeIndex}
								sx={{
									zIndex: 2,
								}}
							/>
							<Box
								onClick={setNavActive.off}
								sx={{
									...absoluteFill,
									zIndex: 1,
									display: { xs: "block", sm: "none" },
								}}
							/>
						</Stack>
					</Grid>
				</Grid>
			</Box>
			<DialogActions
				sx={{
					flexShrink: 0,
					flexWrap: "wrap",
					gap: {
						xs: `0.5em 0em`,
					},
				}}
			>
				<Button
					variant="outlined"
					color="secondary"
					onClick={onClose}
					sx={{
						marginLeft: { xs: 1, md: 0 },
					}}
				>
					{t`Cancel`}
				</Button>
				{!isDefaultIcon && (
					<Button
						variant="contained"
						color="secondary"
						onClick={reset}
						sx={{ order: { xs: -1, sm: 0 } }}
					>
						<Row alignItems="center" gap={1}>
							<Icon icon={defaultIcon} />
							{t`Default`}
						</Row>
					</Button>
				)}
				<Button variant="contained" color="primary" onClick={select}>
					{t`Ok`}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
