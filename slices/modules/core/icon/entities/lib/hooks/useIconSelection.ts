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
	onSetToAll?: OnIconSelectedCallback;
};

export function useIconSelection() {
	const {
		setSelectedIcon,
		setDefaultIcon,
		setSelectionActive,
		setMode,
		onSelectRef,
		onSetToAllRef,
	} = useIconSelectionContext();

	return useCallback(
		({
			icon = null,
			defaultIcon = icon ?? null,
			mode = "selection",
			onSelected,
			onSetToAll,
		}: UseIconSelectionOptions) => {
			setSelectedIcon(icon);
			setDefaultIcon(defaultIcon);
			setSelectionActive(true);
			setMode(mode);
			onSelectRef.current = onSelected ?? null;
			onSetToAllRef.current = onSetToAll ?? null;
		},
		[
			setSelectedIcon,
			setDefaultIcon,
			onSelectRef,
			onSetToAllRef,
			setSelectionActive,
			setMode,
		],
	);
}
