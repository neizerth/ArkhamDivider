import { useCallback, useEffect, useRef, useState } from "react";

export type UseFitFontSizeOptions = {
	/** Lower bound of the search, in percent of the inherited font size. */
	minFontSize?: number;
	/** Upper bound of the search, in percent of the inherited font size. */
	maxFontSize?: number;
	/** Search stops once the bracket is narrower than this, in percent points. */
	resolution?: number;
	onFinish?: (fontSize: number) => void;
};

/** Pixels of measurement noise tolerated before text counts as overflowing. */
const OVERFLOW_TOLERANCE = 1;

/**
 * Shrinks text until it fits its box, in percent of the inherited font size.
 *
 * Replaces `use-fit-text`, whose `ResizeObserver` callback closes over the
 * `calcKey` of the render that created it. That key is always `0`, so every
 * resize after the first one re-requests calculation pass `1` — the pass that
 * already ran. The result: the size measured on mount was final, and text that
 * grew (translation, layout switch, a divider of a different size) simply
 * overflowed its frame for the rest of the session. Only editing the text by
 * hand recovered, because that path compares `innerHTML` instead.
 *
 * Here the search runs directly against the DOM inside one frame instead of one
 * React render per step, so a fit costs a single state update rather than ~6,
 * and every trigger — resize, text mutation, webfont load — starts a fresh one.
 */
export function useFitFontSize<T extends HTMLElement>({
	minFontSize = 20,
	maxFontSize = 100,
	resolution = 5,
	onFinish,
}: UseFitFontSizeOptions = {}) {
	const ref = useRef<T | null>(null);
	const [fontSize, setFontSize] = useState(maxFontSize);

	const isMeasuringRef = useRef(false);
	const frameRef = useRef<number | null>(null);
	const onFinishRef = useRef(onFinish);
	onFinishRef.current = onFinish;

	const measure = useCallback(() => {
		const node = ref.current;

		if (!node || isMeasuringRef.current) {
			return;
		}

		// A node with no box (not laid out yet, or hidden) measures as "fits" at
		// any size — leave the current value alone and wait for the next trigger.
		if (!node.offsetWidth || !node.offsetHeight) {
			return;
		}

		isMeasuringRef.current = true;

		const inlineFontSize = node.style.fontSize;
		const inlineWhiteSpace = node.style.whiteSpace;

		// Every divider text is drawn into the PDF with `lineBreak: false`, i.e.
		// as a single line. Measuring with wrapping allowed found sizes where the
		// text merely fit the box *after* breaking in two, so the preview showed a
		// wrapped title the export would never produce.
		node.style.whiteSpace = "nowrap";

		const applyFontSize = (value: number) => {
			node.style.fontSize = `${value}%`;
		};

		const excessWidth = () => node.scrollWidth - node.offsetWidth;
		const excessHeight = () => node.scrollHeight - node.offsetHeight;

		// The preview scales dividers with `zoom`, so layout metrics are rounded to
		// whole pixels and a slot can report a few pixels of overflow that no font
		// size explains. Measuring the smallest allowed size first tells us how
		// much of the excess is structural; only growth beyond it is real text.
		applyFontSize(minFontSize);

		const baseWidth = Math.max(0, excessWidth());
		const baseHeight = Math.max(0, excessHeight());

		const overflows = () =>
			excessWidth() > baseWidth + OVERFLOW_TOLERANCE ||
			excessHeight() > baseHeight + OVERFLOW_TOLERANCE;

		applyFontSize(maxFontSize);

		let result = maxFontSize;

		if (overflows()) {
			let low = minFontSize;
			let high = maxFontSize;

			while (high - low > resolution) {
				const middle = (low + high) / 2;
				applyFontSize(middle);

				if (overflows()) {
					high = middle;
				} else {
					low = middle;
				}
			}

			result = Math.round(low * 100) / 100;
		}

		node.style.fontSize = inlineFontSize;
		node.style.whiteSpace = inlineWhiteSpace;
		isMeasuringRef.current = false;

		setFontSize((prev) => (prev === result ? prev : result));
		onFinishRef.current?.(result);
	}, [maxFontSize, minFontSize, resolution]);

	const scheduleMeasure = useCallback(() => {
		if (frameRef.current !== null) {
			return;
		}
		frameRef.current = requestAnimationFrame(() => {
			frameRef.current = null;
			measure();
		});
	}, [measure]);

	useEffect(() => {
		const node = ref.current;

		if (!node) {
			return;
		}

		scheduleMeasure();

		// The box comes from the parent, so observing the node itself cannot feed
		// its own font size back in. Ticks caused by the measurement pass are
		// harmless anyway: a repeat pass lands on the same value and bails out.
		const resizeObserver = new ResizeObserver(scheduleMeasure);
		resizeObserver.observe(node);

		// Text is written imperatively (`textContent`), so a prop-level dependency
		// would not see it.
		const mutationObserver = new MutationObserver(scheduleMeasure);
		mutationObserver.observe(node, {
			characterData: true,
			childList: true,
			subtree: true,
		});

		const { fonts } = document;
		fonts?.addEventListener?.("loadingdone", scheduleMeasure);
		void fonts?.ready?.then(scheduleMeasure);

		return () => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
			fonts?.removeEventListener?.("loadingdone", scheduleMeasure);

			if (frameRef.current !== null) {
				cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
		};
	}, [scheduleMeasure]);

	return { ref, fontSize: `${fontSize}%` };
}
