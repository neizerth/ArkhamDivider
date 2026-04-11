import { createContext, type RefObject } from "react";
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
	reset: () => void;
	selectedIcon: Icon | null;
	defaultIcon: Icon | null;
	setSelectionActive: (active: boolean) => void;
	mode: IconSelectionMode;
	setMode: (mode: IconSelectionMode) => void;
	onSelectRef: RefObject<OnIconSelectedCallback | null>;
};

export const IconSelectionContext = createContext<IconSelectionContextValue>({
	selectionActive: false,
	setSelectedIcon: () => {},
	clearSelectedIcon: () => {},
	setDefaultIcon: () => {},
	select: () => {},
	reset: () => {},
	selectedIcon: null,
	defaultIcon: null,
	setSelectionActive: () => {},
	onSelectRef: { current: null },
	mode: "selection",
	setMode: () => {},
});
