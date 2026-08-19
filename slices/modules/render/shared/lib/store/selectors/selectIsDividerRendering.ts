import type { RootState } from "@/shared/store";
import { selectDividerRenderId } from "../render";

/**
 * True while the export loop is capturing this specific divider.
 *
 * Prefer this over comparing `selectDividerRenderId` in a component: the export loop
 * dispatches `setDividerRenderId` once per divider, so every component subscribed to the
 * raw id re-renders on every step — O(N²) over a run. A boolean changes for only the two
 * dividers involved (the one leaving and the one entering), leaving the rest untouched.
 */
export const selectIsDividerRendering =
	(dividerId?: string) => (state: RootState) => {
		const renderId = selectDividerRenderId(state);
		// `renderId` is null when idle; never treat that as matching a missing `dividerId`.
		return renderId !== null && renderId === dividerId;
	};

/** True while any divider capture is in progress. */
export const selectIsRendering = (state: RootState) =>
	selectDividerRenderId(state) !== null;
