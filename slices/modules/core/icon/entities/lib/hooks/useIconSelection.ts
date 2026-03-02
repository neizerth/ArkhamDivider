import { useCallback, useContext } from "react";
import type { OnIconSelectedCallback } from "../../../shared/model";
import { IconSelectionContext } from "../../../shared/ui";

type Options = {
	icon?: string | null;
	defaultIcon?: string | null;
	onSelected: OnIconSelectedCallback;
};

export function useIconSelection({
	icon = null,
	defaultIcon = icon ?? null,
	onSelected,
}: Options) {
	const { setSelectedIcon, setDefaultIcon, setSelectionActive, onSelectRef } =
		useContext(IconSelectionContext);

	return useCallback(() => {
		console.log("selection start", icon);
		setSelectedIcon(icon);
		setDefaultIcon(defaultIcon);
		setSelectionActive(true);
		onSelectRef.current = onSelected;
	}, [
		icon,
		defaultIcon,
		onSelected,
		setSelectedIcon,
		setDefaultIcon,
		onSelectRef,
		setSelectionActive,
	]);
}
