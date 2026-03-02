import { createRef, useRef } from "react";
import type { IconGroup, IconSelectionSectionRef } from "../../../model";

export const useIconGroupSectionRefs = (iconGroups: IconGroup[]) => {
	const sectionRefs = useRef<IconSelectionSectionRef[]>([]);

	if (sectionRefs.current.length !== iconGroups.length) {
		sectionRefs.current = iconGroups.map(() =>
			createRef<HTMLDivElement | null>(),
		);
	}

	return sectionRefs;
};
