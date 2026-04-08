import { useEffect } from "react";

type AnyRefObject<T> = { current: T | null };

export function useRemeasureOnFontsLoaded(ref: AnyRefObject<HTMLElement>) {
	useEffect(() => {
		const { fonts } = document;

		const bumpLayout = () => {
			const el = ref.current;
			if (!el) {
				return;
			}

			// `use-fit-text` recalculates on ResizeObserver events. Loading a font
			// can change text metrics without changing element size, so we gently
			// nudge layout to trigger a resize observation.
			const prev = el.style.paddingRight;
			el.style.paddingRight = prev ? "" : "0.01px";
			requestAnimationFrame(() => {
				// restore, keeping visual impact effectively zero
				if (!ref.current) {
					return;
				}
				ref.current.style.paddingRight = prev;
			});
		};

		fonts.ready.then(bumpLayout);

		fonts.addEventListener?.("loadingdone", bumpLayout);
		fonts.addEventListener?.("loadingerror", bumpLayout);

		return () => {
			fonts.removeEventListener?.("loadingdone", bumpLayout);
			fonts.removeEventListener?.("loadingerror", bumpLayout);
		};
	}, [ref]);
}
