import { Button, Dialog, DialogActions, Grid } from "@mui/material";
import { useCallback, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconSelectionContext } from "../../../../../shared/ui";
import { useIconGroups } from "../../lib";
import type { IconSelectionSectionRef } from "../../model";
import { IconSelectionList } from "../IconSelectionList";
import { IconSelectionPreview } from "../IconSelectionPreview";

export function IconSelectionModal() {
	const { t } = useTranslation();
	const { selectionActive, setSelectionActive, onSelectRef } =
		useContext(IconSelectionContext);
	const open = selectionActive;

	const listSectionRef = useRef<HTMLDivElement>(null);
	const sectionRefs = useRef<IconSelectionSectionRef[]>([]);

	const iconGroups = useIconGroups();

	const onClose = useCallback(() => {
		console.log("selection end");
		setSelectionActive(false);
		onSelectRef.current = null;
	}, [onSelectRef, setSelectionActive]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<Grid container padding={2}>
				<Grid
					size={{
						xs: 12,
						md: 9,
					}}
				>
					<IconSelectionList
						iconGroups={iconGroups}
						sectionRefs={sectionRefs.current}
						ref={listSectionRef}
					/>
				</Grid>
				<Grid
					size={{
						xs: 12,
						md: 3,
					}}
				>
					<IconSelectionPreview />
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
