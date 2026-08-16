import { useEffect, useRef } from "react";

/**
 * Capture switches the divider node from preview `zoom` to `zoom: 1` and back.
 * Chrome keeps the pre-capture layout of the subtree after the zoom returns:
 * content ends up visually shifted (usually upwards) until something else forces
 * a relayout — nothing in the styles actually changed, and a re-render fixes it.
 *
 * Forcing a synchronous relayout of the node once the capture is over restores it.
 */
export const useRepaintAfterRender = (
	ref: React.RefObject<HTMLElement | null>,
	isRendering: boolean,
) => {
	const wasRendering = useRef(isRendering);

	useEffect(() => {
		const wasActive = wasRendering.current;
		wasRendering.current = isRendering;

		const node = ref.current;

		if (isRendering || !wasActive || !node) {
			return;
		}

		const frame = requestAnimationFrame(() => {
			const { display } = node.style;
			node.style.display = "none";
			void node.offsetHeight;
			node.style.display = display;
		});

		return () => cancelAnimationFrame(frame);
	}, [isRendering, ref]);
};
