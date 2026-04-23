import {
	type PropsWithChildren,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { isMediaItem, revokeMediaById } from "@/modules/core/media/shared/lib";
import { EMPTY_ICON } from "../../../shared/config";
import type {
	Icon,
	IconSelectionMode,
	OnIconSelectedCallback,
} from "../../../shared/model";
import {
	IconSelectionContext,
	type IconSelectionContextValue,
} from "../../../shared/ui";
import { IconSelectionModal } from "../../../widgets/ui";

export function IconSelectionProvider({ children }: PropsWithChildren) {
	const [selectedIcon, setSelectedIconInternal] = useState<Icon | null>(null);
	const [defaultIcon, setDefaultIcon] = useState<Icon | null>(null);
	const [mode, setMode] = useState<IconSelectionMode>("selection");
	const onSelectRef = useRef<OnIconSelectedCallback | null>(null);
	const [selectionActive, setSelectionActive] = useState(false);

	const clearSelectedIcon = useCallback(() => {
		if (isMediaItem(selectedIcon)) {
			revokeMediaById(selectedIcon.mediaId);
		}
	}, [selectedIcon]);

	const setSelectedIcon = useCallback(
		(icon: Icon | null) => {
			if (!selectedIcon) {
				clearSelectedIcon();
			}
			setSelectedIconInternal(icon);
		},
		[clearSelectedIcon, selectedIcon],
	);

	const save = useCallback((icon: Icon | null) => {
		setSelectionActive(false);
		onSelectRef.current?.(icon);
	}, []);

	const select = useCallback(() => {
		save(selectedIcon);
	}, [save, selectedIcon]);

	const reset = useCallback(() => {
		save(defaultIcon);
	}, [save, defaultIcon]);

	const clear = useCallback(() => {
		save(EMPTY_ICON);
	}, [save]);

	const value = useMemo(
		(): IconSelectionContextValue => ({
			setSelectedIcon,
			setDefaultIcon,
			selectedIcon,
			defaultIcon,
			onSelectRef,
			selectionActive,
			select,
			reset,
			setSelectionActive,
			clearSelectedIcon,
			mode,
			setMode,
			clear,
		}),
		[
			selectedIcon,
			defaultIcon,
			selectionActive,
			setSelectedIcon,
			clearSelectedIcon,
			select,
			reset,
			mode,
			clear,
		],
	);

	return (
		<IconSelectionContext.Provider value={value}>
			{children}
			<IconSelectionModal />
		</IconSelectionContext.Provider>
	);
}
