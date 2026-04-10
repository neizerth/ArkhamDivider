import { useCallback, useContext } from "react";
import type {
	Icon,
	IconSelectionMode,
	OnIconSelectedCallback,
} from "../../../shared/model";
import { IconSelectionContext } from "../../../shared/ui";

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
	} = useContext(IconSelectionContext);

	return useCallback(
		({
			icon = null,
			defaultIcon = icon ?? null,
			mode = "selection",
			onSelected,
		}: UseIconSelectionOptions) => {
			setSelectedIcon(icon);
			setDefaultIcon(defaultIcon);
			setSelectionActive(true);
			setMode(mode);
			onSelectRef.current = onSelected ?? null;
		},
		[setSelectedIcon, setDefaultIcon, onSelectRef, setSelectionActive, setMode],
	);
}
