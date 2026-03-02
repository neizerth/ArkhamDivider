import { createContext, type RefObject } from "react";
import type { Icon, OnIconSelectedCallback } from "../../model";

export type IconSelectionContextValue = {
	selectionActive: boolean;
	setSelectedIcon: (icon: Icon | null) => void;
	clearSelectedIcon: () => void;
	setDefaultIcon: (icon: Icon | null) => void;
	setInitialIcon: (icon: Icon | null) => void;
	select: () => void;
	reset: () => void;
	initialIcon: Icon | null;
	selectedIcon: Icon | null;
	defaultIcon: Icon | null;
	setSelectionActive: (active: boolean) => void;
	onSelectRef: RefObject<OnIconSelectedCallback | null>;
};

export const IconSelectionContext = createContext<IconSelectionContextValue>({
	selectionActive: false,
	setSelectedIcon: () => {},
	clearSelectedIcon: () => {},
	setDefaultIcon: () => {},
	setInitialIcon: () => {},
	select: () => {},
	reset: () => {},
	initialIcon: null,
	selectedIcon: null,
	defaultIcon: null,
	setSelectionActive: () => {},
	onSelectRef: { current: null },
});
