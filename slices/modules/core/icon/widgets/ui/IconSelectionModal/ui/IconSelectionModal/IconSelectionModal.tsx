import { Button, Dialog, DialogActions, Grid, Stack } from "@mui/material";
import {
	createRef,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useScrollSpy } from "@/shared/lib";
import { IconSelectionContext } from "../../../../../shared/ui";
import {
	findGroupIndexByIcon,
	useIconGroups,
	useVirtualizedIconGroups,
} from "../../lib";
import type { IconSelectionSectionRef } from "../../model";
import { IconSelectionList } from "../IconSelectionList";
import { IconSelectionNav } from "../IconSelectionNav";
import { IconSelectionPreview } from "../IconSelectionPreview";

export function IconSelectionModal() {
	const { t } = useTranslation();
	const { defaultIcon, selectionActive, setSelectionActive, onSelectRef } =
		useContext(IconSelectionContext);
	const open = selectionActive;

	const listSectionRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [scrollContainerReady, setScrollContainerReady] = useState(false);
	const sectionRefs = useRef<IconSelectionSectionRef[]>([]);

	const iconGroups = useIconGroups();
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

	if (sectionRefs.current.length !== iconGroups.length) {
		sectionRefs.current = iconGroups.map(() =>
			createRef<HTMLDivElement | null>(),
		);
	}

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
			scrollToIndex(index);
		},
		[scrollToIndex],
	);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<Grid container padding={2}>
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
				>
					<Stack gap={2}>
						<IconSelectionPreview display={{ xs: "none", sm: "block" }} />
						<IconSelectionNav
							iconGroups={iconGroups}
							onSectionClick={handleSectionClick}
							activeIndex={activeIndex}
						/>
					</Stack>
				</Grid>
			</Grid>
			<DialogActions>
				<Button variant="contained" color="primary" onClick={onClose}>
					{t`Cancel`}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
