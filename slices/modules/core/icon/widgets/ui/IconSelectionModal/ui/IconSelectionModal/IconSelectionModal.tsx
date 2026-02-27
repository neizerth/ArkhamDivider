import { Button, Dialog, DialogActions, Grid } from "@mui/material";
import { useCallback, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconSelectionContext } from "../../../../../shared/ui";
import { useIconGroups } from "../../lib";
import type { IconSelectionSectionRef } from "../../model";
import { IconSelectionList } from "../IconSelectionList";

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
		<Dialog open={open} onClose={onClose}>
			<Grid container padding={2}>
				<Grid size={8}>
					<IconSelectionList
						iconGroups={iconGroups}
						sectionRefs={sectionRefs.current}
						ref={listSectionRef}
					/>
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
