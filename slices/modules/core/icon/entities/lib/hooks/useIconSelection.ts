import { useCallback } from "react";
import type {
	Icon,
	IconSelectionMode,
	OnIconSelectedCallback,
} from "../../../shared/model";
import { useIconSelectionContext } from "../../../shared/ui";

export type UseIconSelectionOptions = {
	icon?: Icon | null;
	defaultIcon?: Icon | null;
	mode?: IconSelectionMode;
	onSelected?: OnIconSelectedCallback;
};

export function useIconSelection() {
	const {
		setSelectedIcon,
		setDefaultIcon,
		setSelectionActive,
		setMode,
		onSelectRef,
	} = useIconSelectionContext();

	return useCallback(
		({
			icon = null,
			defaultIcon = icon ?? null,
			mode = "selection",
			onSelected,
		}: UseIconSelectionOptions) => {
			console.log("useIconSelection", icon, defaultIcon, mode, onSelected);
			setSelectedIcon(icon);
			setDefaultIcon(defaultIcon);
			setSelectionActive(true);
			setMode(mode);
			onSelectRef.current = onSelected ?? null;
		},
		[setSelectedIcon, setDefaultIcon, onSelectRef, setSelectionActive, setMode],
	);
}
