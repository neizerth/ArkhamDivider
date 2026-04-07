import { useCallback, useContext } from "react";
import type { Icon, OnIconSelectedCallback } from "../../../shared/model";
import { IconSelectionContext } from "../../../shared/ui";

export type UseIconSelectionOptions = {
	icon?: Icon | null;
	defaultIcon?: Icon | null;
	onSelected: OnIconSelectedCallback;
};

export function useIconSelection() {
	const { setSelectedIcon, setDefaultIcon, setSelectionActive, onSelectRef } =
		useContext(IconSelectionContext);

	return useCallback(
		({
			icon = null,
			defaultIcon = icon ?? null,
			onSelected,
		}: UseIconSelectionOptions) => {
			setSelectedIcon(icon);
			setDefaultIcon(defaultIcon);
			setSelectionActive(true);
			onSelectRef.current = onSelected;
		},
		[setSelectedIcon, setDefaultIcon, onSelectRef, setSelectionActive],
	);
}
