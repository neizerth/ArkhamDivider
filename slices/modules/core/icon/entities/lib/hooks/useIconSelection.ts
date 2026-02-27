import { useCallback, useContext } from "react";
import type { OnIconSelectedCallback } from "../../../shared/model";
import { IconSelectionContext } from "../../../shared/ui";

type Options = {
	icon?: string | null;
	onSelected: OnIconSelectedCallback;
};

export function useIconSelection({ icon = null, onSelected }: Options) {
	const { setSelectedIcon, setDefaultIcon, setSelectionActive, onSelectRef } =
		useContext(IconSelectionContext);

	return useCallback(() => {
		console.log("selection start", icon);
		setSelectedIcon(icon);
		setDefaultIcon(icon);
		setSelectionActive(true);
		onSelectRef.current = onSelected;
	}, [
		icon,
		onSelected,
		setSelectedIcon,
		setDefaultIcon,
		onSelectRef,
		setSelectionActive,
	]);
}
