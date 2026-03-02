import { Box, Button, Dialog, DialogActions, Grid, Stack } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
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
		clearSelectedIcon,
		onSelectRef,
		setSelectionActive,
		select,
		reset,
	} = useContext(IconSelectionContext);
	const open = selectionActive;
	const isDefaultIcon = defaultIcon === selectedIcon;

	const listSectionRef = useRef<HTMLDivElement>(null);

	const [navActive, setNavActive] = useBoolean(false);

	const iconGroups = useIconGroups();
	const sectionRefs = useIconGroupSectionRefs(iconGroups);

	const defaultSectionIndex = useMemo(
		() => findGroupIndexByIcon(iconGroups, defaultIcon),
		[iconGroups, defaultIcon],
	);

	const { virtualizer, scrollToIndex, scrollContainerRef } =
		useVirtualizedIconGroups({
			groups: iconGroups,
		});

	const activeIndex = useScrollSpy({
		sectionElementRefs: sectionRefs.current,
		scrollingElement: scrollContainerRef,
		activeSectionDefault: defaultSectionIndex,
		offsetPx: 48,
	});

	useEffect(() => {
		if (!open) {
			return;
		}
		scrollToIndex(defaultSectionIndex);
	}, [open, defaultSectionIndex, scrollToIndex]);

	const onClose = useCallback(() => {
		clearSelectedIcon();
		setSelectionActive(false);
		onSelectRef.current = null;
	}, [onSelectRef, clearSelectedIcon, setSelectionActive]);

	const handleSectionClick = useCallback(
		(index: number) => {
			setNavActive.toggle();
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
							onSectionHeaderClick={setNavActive.toggle}
							onSectionSubgroupHeaderClick={setNavActive.toggle}
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
								onClose={setNavActive.toggle}
								activeIndex={activeIndex}
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
						xs: `0.5em 0`,
						sm: 0,
					},
				}}
			>
				<Button variant="outlined" color="secondary" onClick={onClose}>
					{t`Cancel`}
				</Button>
				{defaultIcon && !isDefaultIcon && (
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
