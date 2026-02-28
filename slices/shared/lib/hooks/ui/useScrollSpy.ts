import type React from "react";
import { useEffect, useState } from "react";
import { throttle } from "@/shared/util";

export interface useScrollSpyParams {
	activeSectionDefault?: number;
	offsetPx?: number;
	sectionElementRefs: React.RefObject<HTMLElement | null>[];
	throttleMs?: number;
	scrollingElement?: React.RefObject<HTMLElement | null>;
}
export const useScrollSpy = ({
	activeSectionDefault = 0,
	offsetPx = 0,
	scrollingElement,
	sectionElementRefs = [],
	throttleMs = 100,
}: useScrollSpyParams): number | undefined => {
	const [activeSection, setActiveSection] = useState(activeSectionDefault);

	const handle = throttle(throttleMs, () => {
		const scrollEl = scrollingElement?.current;
		const threshold =
			scrollEl instanceof Element
				? scrollEl.getBoundingClientRect().top + offsetPx
				: offsetPx;

		let currentSectionId = 0;
		for (let i = 0; i < sectionElementRefs.length; i += 1) {
			const section = sectionElementRefs[i].current;
			if (!section || !(section instanceof Element)) {
				continue;
			}
			if (section.getBoundingClientRect().top < threshold) {
				currentSectionId = i;
			} else {
				break;
			}
		}
		setActiveSection(currentSectionId);
	});

	useEffect(() => {
		const scrollable = scrollingElement?.current ?? window;
		if (scrollable && typeof scrollable.addEventListener === "function") {
			scrollable.addEventListener("scroll", handle);
			handle();
			return () => scrollable.removeEventListener("scroll", handle);
		}
		return undefined;
	}, [scrollingElement, handle]);
	return activeSection;
};
