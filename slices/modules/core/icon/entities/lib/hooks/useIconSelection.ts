import { useCallback, useContext } from "react";
import type { Icon, OnIconSelectedCallback } from "../../../shared/model";
import { IconSelectionContext } from "../../../shared/ui";

type Options = {
	icon?: Icon | null;
	defaultIcon?: Icon | null;
	onSelected: OnIconSelectedCallback;
};

export function useIconSelection({
	icon = null,
	defaultIcon = icon ?? null,
	onSelected,
}: Options) {
	const {
		setSelectedIcon,
		setDefaultIcon,
		setInitialIcon,
		setSelectionActive,
		onSelectRef,
	} = useContext(IconSelectionContext);

	return useCallback(() => {
		console.log("selection start", icon);
		setSelectedIcon(icon);
		setDefaultIcon(defaultIcon);
		setInitialIcon(icon);
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
		setInitialIcon,
	]);
}
