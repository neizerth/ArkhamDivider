import { useEffect } from "react";
import { INITIAL_SCROLL_DELAY_MS } from "../../config";

type Options = {
	/** Group index to scroll to (e.g. default icon's section). */
	initialScrollIndex: number | undefined;
	/** When true, scroll runs (e.g. modal is open). Ensures effect re-runs on every open. */
	active: boolean;
	/** Same as nav uses — virtualizer's scrollToIndex. */
	scrollToIndex: (index: number) => void;
};

/**
 * On modal open, scrolls to initialScrollIndex using the same scrollToIndex as the nav (double rAF + delay).
 */
export function useInitialScrollToIndex({
	initialScrollIndex,
	active,
	scrollToIndex,
}: Options): void {
	useEffect(() => {
		if (!active || initialScrollIndex == null || initialScrollIndex < 0) {
			return;
		}
		const runScroll = () => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => scrollToIndex(initialScrollIndex));
			});
		};
		const delays = [0, 100, 300, 500];
		const timeouts: ReturnType<typeof setTimeout>[] = [];
		for (const delay of delays) {
			timeouts.push(setTimeout(runScroll, INITIAL_SCROLL_DELAY_MS + delay));
		}
		return () => timeouts.forEach(clearTimeout);
	}, [active, initialScrollIndex, scrollToIndex]);
}
