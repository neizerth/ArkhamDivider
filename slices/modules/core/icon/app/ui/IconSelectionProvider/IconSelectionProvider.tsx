import {
	type PropsWithChildren,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { revokeMediaURL } from "@/modules/core/media/shared/lib";
import { isCustomIcon } from "../../../shared/lib";
import type { OnIconSelectedCallback } from "../../../shared/model";
import {
	IconSelectionContext,
	type IconSelectionContextValue,
} from "../../../shared/ui";
import { IconSelectionModal } from "../../../widgets/ui";

export function IconSelectionProvider({ children }: PropsWithChildren) {
	const [selectedIcon, setSelectedIconInternal] = useState<string | null>(null);
	const [defaultIcon, setDefaultIcon] = useState<string | null>(null);
	const onSelectRef = useRef<OnIconSelectedCallback | null>(null);
	const [selectionActive, setSelectionActive] = useState(false);

	const setSelectedIcon = useCallback(
		(icon: string | null) => {
			if (isCustomIcon(selectedIcon)) {
				revokeMediaURL(selectedIcon);
			}
			setSelectedIconInternal(icon);
		},
		[selectedIcon],
	);

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
		[selectedIcon, defaultIcon, selectionActive, setSelectedIcon],
	);

	return (
		<IconSelectionContext.Provider value={value}>
			{children}
			<IconSelectionModal />
		</IconSelectionContext.Provider>
	);
}
