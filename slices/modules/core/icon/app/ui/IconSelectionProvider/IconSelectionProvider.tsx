import {
	type PropsWithChildren,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { isMediaItem, revokeMediaById } from "@/modules/core/media/shared/lib";
import type { Icon, OnIconSelectedCallback } from "../../../shared/model";
import {
	IconSelectionContext,
	type IconSelectionContextValue,
} from "../../../shared/ui";
import { IconSelectionModal } from "../../../widgets/ui";

export function IconSelectionProvider({ children }: PropsWithChildren) {
	const [selectedIcon, setSelectedIconInternal] = useState<Icon | null>(null);
	const [defaultIcon, setDefaultIcon] = useState<Icon | null>(null);
	const onSelectRef = useRef<OnIconSelectedCallback | null>(null);
	const [selectionActive, setSelectionActive] = useState(false);

	const setSelectedIcon = useCallback(
		(icon: Icon | null) => {
			if (isMediaItem(selectedIcon)) {
				revokeMediaById(selectedIcon.mediaId);
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
