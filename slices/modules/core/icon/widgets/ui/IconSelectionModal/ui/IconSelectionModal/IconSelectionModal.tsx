import { Box, Button, Dialog, DialogActions, Grid, Stack } from "@mui/material";
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
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

export function IconSelectionModal() {
	const { t } = useTranslation();
	const {
		defaultIcon,
		selectedIcon,
		selectionActive,
		setSelectionActive,
		onSelectRef,
	} = useContext(IconSelectionContext);
	const open = selectionActive;
	const isDefaultIcon = defaultIcon === selectedIcon;

	const listSectionRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [scrollContainerReady, setScrollContainerReady] = useState(false);

	const [navActive, setNavActive] = useBoolean(false);

	const iconGroups = useIconGroups();
	const sectionRefs = useIconGroupSectionRefs(iconGroups);

	const defaultSectionIndex = useMemo(
		() => findGroupIndexByIcon(iconGroups, defaultIcon),
		[iconGroups, defaultIcon],
	);

	const { virtualizer, scrollToIndex } = useVirtualizedIconGroups({
		containerRef: scrollContainerRef,
		groups: iconGroups,
		measureTrigger: scrollContainerReady,
	});

	useEffect(() => {
		if (!open) {
			return;
		}
		const id = requestAnimationFrame(() => {
			requestAnimationFrame(() => setScrollContainerReady(true));
		});
		return () => cancelAnimationFrame(id);
	}, [open]);

	const activeIndex = useScrollSpy({
		sectionElementRefs: sectionRefs.current,
		scrollingElement: scrollContainerRef,
		scrollingElementReady: scrollContainerReady,
		activeSectionDefault: defaultSectionIndex,
		offsetPx: 48,
	});

	useEffect(() => {
		if (!open || !scrollContainerReady) {
			return;
		}
		scrollToIndex(defaultSectionIndex);
	}, [open, scrollContainerReady, defaultSectionIndex, scrollToIndex]);

	const onClose = useCallback(() => {
		setScrollContainerReady(false);
		setSelectionActive(false);
		onSelectRef.current = null;
	}, [onSelectRef, setSelectionActive]);

	const handleSectionClick = useCallback(
		(index: number) => {
			setNavActive.toggle();
			requestAnimationFrame(() => {
				requestAnimationFrame(() => scrollToIndex(index));
			});
		},
		[scrollToIndex, setNavActive],
	);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			PaperProps={{
				sx: {
					display: "flex",
					flexDirection: "column",
					maxHeight: "100vh",
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
				<Grid
					container
					padding={2}
					position="relative"
					sx={{
						flex: 1,
						minHeight: 0,
						overflow: "hidden",
					}}
				>
					<Grid
						size={{
							xs: 12,
							sm: 7,
							md: 9,
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
							md: 3,
						}}
						sx={{
							position: {
								xs: "absolute",
								sm: "static",
							},
							display: {
								xs: navActive ? "flex" : "none",
								sm: "flex",
							},
							flexDirection: "column",
							minHeight: 0,
							maxHeight: "100%",
							top: 0,
							left: 0,
							backgroundColor: {
								xs: "background.paper",
								sm: "transparent",
							},
							zIndex: 1,
						}}
					>
						<Stack gap={2} sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
							<IconSelectionPreview display={{ xs: "none", sm: "block" }} />
							<IconSelectionNav
								iconGroups={iconGroups}
								onSectionClick={handleSectionClick}
								onClose={setNavActive.toggle}
								activeIndex={activeIndex}
								sx={{
									borderRadius: 1,
									padding: 1,
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
						onClick={onClose}
						sx={{ order: { xs: -1, sm: 0 } }}
					>
						<Row alignItems="center" gap={1}>
							<Icon icon={defaultIcon} />
							{t`Default`}
						</Row>
					</Button>
				)}
				<Button variant="contained" color="primary" onClick={onClose}>
					{t`Ok`}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
