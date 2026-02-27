import { type PropsWithChildren, useMemo, useRef, useState } from "react";
import type { OnIconSelectedCallback } from "../../../shared/model";
import {
	IconSelectionContext,
	type IconSelectionContextValue,
} from "../../../shared/ui";
import { IconSelectionModal } from "../../../widgets/ui";

export function IconSelectionProvider({ children }: PropsWithChildren) {
	const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
	const [defaultIcon, setDefaultIcon] = useState<string | null>(null);
	const onSelectRef = useRef<OnIconSelectedCallback | null>(null);
	const [selectionActive, setSelectionActive] = useState(false);

	const value = useMemo(
		(): IconSelectionContextValue => ({
			setSelectedIcon,
			setDefaultIcon,
			selectedIcon,
			defaultIcon,
			onSelectRef,
			selectionActive,
			setSelectionActive,
		}),
		[selectedIcon, defaultIcon, selectionActive],
	);

	return (
		<IconSelectionContext.Provider value={value}>
			{children}
			<IconSelectionModal />
		</IconSelectionContext.Provider>
	);
}
