import { useCallback, useRef } from "react";

/**
 * Stores font size scale in a ref to avoid re-rendering on every measurement change.
 * The ref is later persisted on blur by the parent hook.
 */
export function useFontSizeScaleRef(initial: number | null | undefined) {
	const ref = useRef<number | null>(initial ?? null);

	const onFontSizeChange = useCallback((fontSizeScale: number) => {
		ref.current = fontSizeScale;
	}, []);

	return { fontSizeScaleRef: ref, onFontSizeChange };
}
