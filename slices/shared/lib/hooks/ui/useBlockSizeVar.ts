import { useEffect, useRef } from "react";
import { observe } from "./useBoundingRect";

/**
 * Publishes an element's own block size into a custom property on that same element, so CSS
 * inside it can size against a height no CSS length can reach.
 *
 * The size is `clientHeight`, not `getBoundingClientRect()`: an ancestor `zoom` (which
 * `DividerView` applies for preview and print scaling) must not compound into a length that
 * is already written in the element's own coordinate system.
 *
 * Nothing here goes through React state. The value has to be correct at the instant Chrome
 * lays the document out for printing, and a `beforeprint` listener that schedules a render
 * misses that window — the sheet is measured before React commits. Writing the property
 * straight onto the node keeps the update synchronous, and spares a print run of several
 * hundred dividers a re-render per measurement.
 *
 * `ResizeObserver` alone is not enough on a print sheet: pages are `content-visibility:
 * auto`, and the spec has observers skip elements whose content is skipped, so a divider on
 * a page that is never scrolled to mounts at zero and is never told it gained a real size.
 * Explicit reads do lay the subtree out, hence the settle pass and the `beforeprint` read.
 * A zero is never published — it only means "not laid out yet", and the CSS fallback covers
 * that case.
 */
export function useBlockSizeVar<T extends HTMLElement>(variable: string) {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) {
			return;
		}

		const measure = () => {
			const height = node.clientHeight;
			if (!height) {
				return;
			}
			node.style.setProperty(variable, `${height}px`);
		};

		measure();

		let frame = 0;
		const settle = () => {
			frame = requestAnimationFrame(measure);
		};
		if (document.fonts) {
			document.fonts.ready.then(settle);
		} else {
			settle();
		}

		window.addEventListener("beforeprint", measure);
		const stopObserving = observe(node, measure);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("beforeprint", measure);
			stopObserving();
		};
	}, [variable]);

	return ref;
}
