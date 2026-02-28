import { Button, Dialog, DialogActions, Grid, Stack } from "@mui/material";
import {
	createRef,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { IconSelectionContext } from "../../../../../shared/ui";
import { findGroupIndexByIcon, useIconGroups } from "../../lib";
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
	const scrollToIndexRef = useRef<((index: number) => void) | null>(null);
	const sectionRefs = useRef<IconSelectionSectionRef[]>([]);

	const iconGroups = useIconGroups();
	const defaultSectionIndex = useMemo(
		() => findGroupIndexByIcon(iconGroups, defaultIcon),
		[iconGroups, defaultIcon],
	);

	if (sectionRefs.current.length !== iconGroups.length) {
		sectionRefs.current = iconGroups.map(() =>
			createRef<HTMLDivElement | null>(),
		);
	}

	useEffect(() => {
		if (!open) {
			return;
		}
		// List заполняет scrollToIndexRef при монтировании — скролл после готовности контейнера
		const id = requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				scrollToIndexRef.current?.(defaultSectionIndex);
			});
		});
		return () => cancelAnimationFrame(id);
	}, [open, defaultSectionIndex]);

	const onClose = useCallback(() => {
		setSelectionActive(false);
		onSelectRef.current = null;
	}, [onSelectRef, setSelectionActive]);

	const handleSectionClick = useCallback((index: number) => {
		scrollToIndexRef.current?.(index);
	}, []);

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
						scrollToIndexRef={scrollToIndexRef}
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
							sectionRefs={sectionRefs.current}
							scrollContainerRef={scrollContainerRef}
							onSectionClick={handleSectionClick}
							activeSectionDefault={defaultSectionIndex}
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
