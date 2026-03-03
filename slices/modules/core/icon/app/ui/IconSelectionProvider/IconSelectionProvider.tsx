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
	const [initialIcon, setInitialIcon] = useState<Icon | null>(null);
	const onSelectRef = useRef<OnIconSelectedCallback | null>(null);
	const [selectionActive, setSelectionActive] = useState(false);

	const clearSelectedIcon = useCallback(() => {
		if (isMediaItem(selectedIcon)) {
			revokeMediaById(selectedIcon.mediaId);
		}
	}, [selectedIcon]);

	const setSelectedIcon = useCallback(
		(icon: Icon | null) => {
			clearSelectedIcon();
			setSelectedIconInternal(icon);
		},
		[clearSelectedIcon],
	);

	const save = useCallback((icon: Icon | null) => {
		onSelectRef.current?.(icon);
		setSelectionActive(false);
	}, []);

	const select = useCallback(() => {
		save(selectedIcon);
	}, [save, selectedIcon]);

	const reset = useCallback(() => {
		save(defaultIcon);
	}, [save, defaultIcon]);

	const value = useMemo(
		(): IconSelectionContextValue => ({
			setSelectedIcon,
			setDefaultIcon,
			setInitialIcon,
			initialIcon,
			selectedIcon,
			defaultIcon,
			onSelectRef,
			selectionActive,
			select,
			reset,
			setSelectionActive,
			clearSelectedIcon,
		}),
		[
			selectedIcon,
			initialIcon,
			defaultIcon,
			selectionActive,
			setSelectedIcon,
			clearSelectedIcon,
			select,
			reset,
		],
	);

	return (
		<IconSelectionContext.Provider value={value}>
			{children}
			<IconSelectionModal />
		</IconSelectionContext.Provider>
	);
}
