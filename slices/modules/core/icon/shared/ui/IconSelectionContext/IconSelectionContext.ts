import { createContext, type RefObject } from "react";
import type { OnIconSelectedCallback } from "../../model";

export type IconSelectionContextValue = {
	selectionActive: boolean;
	setSelectedIcon: (icon: string | null) => void;
	setDefaultIcon: (icon: string | null) => void;
	selectedIcon: string | null;
	defaultIcon: string | null;
	setSelectionActive: (active: boolean) => void;
	onSelectRef: RefObject<OnIconSelectedCallback | null>;
};

export const IconSelectionContext = createContext<IconSelectionContextValue>({
	selectionActive: false,
	setSelectedIcon: () => {},
	setDefaultIcon: () => {},
	selectedIcon: null,
	defaultIcon: null,
	setSelectionActive: () => {},
	onSelectRef: { current: null },
});
