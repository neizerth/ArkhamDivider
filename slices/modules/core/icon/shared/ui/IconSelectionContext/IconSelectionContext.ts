import { createContext, type RefObject, useContext } from "react";
import type {
	Icon,
	IconSelectionMode,
	OnIconSelectedCallback,
} from "../../model";

export type IconSelectionContextValue = {
	selectionActive: boolean;
	setSelectedIcon: (icon: Icon | null) => void;
	clearSelectedIcon: () => void;
	setDefaultIcon: (icon: Icon | null) => void;
	select: () => void;
	setToAll: () => void;
	reset: () => void;
	clear: () => void;
	selectedIcon: Icon | null;
	defaultIcon: Icon | null;
	setSelectionActive: (active: boolean) => void;
	mode: IconSelectionMode;
	setMode: (mode: IconSelectionMode) => void;
	onSelectRef: RefObject<OnIconSelectedCallback | null>;
	onSetToAllRef: RefObject<OnIconSelectedCallback | null>;
};

export const IconSelectionContext = createContext<IconSelectionContextValue>({
	selectionActive: false,
	setSelectedIcon: () => {},
	clearSelectedIcon: () => {},
	setDefaultIcon: () => {},
	select: () => {},
	setToAll: () => {},
	reset: () => {},
	clear: () => {},
	selectedIcon: null,
	defaultIcon: null,
	setSelectionActive: () => {},
	onSelectRef: { current: null },
	onSetToAllRef: { current: null },
	mode: "selection",
	setMode: () => {},
});

export function useIconSelectionContext() {
	return useContext(IconSelectionContext);
}
