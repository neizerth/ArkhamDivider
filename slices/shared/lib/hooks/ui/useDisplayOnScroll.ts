import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import { throttle } from "@/shared/util";

export type Options = {
	/** Scroll down this many px — then hide */
	offsetDown: number;
	/** Scroll up this many px — then show */
	offsetUp: number;
	media: string;
	throttleMs?: number;
};

export function useDisplayOnScroll(config: Options): boolean {
	const { offsetDown, offsetUp, media, throttleMs = 100 } = config;
	const matches = useMediaQuery(media);
	const [visible, setVisible] = useState(true);

	const lastY = useRef(window.scrollY);
	const accumulatedDown = useRef(0);
	const accumulatedUp = useRef(0);

	useEffect(() => {
		if (!matches) {
			setVisible(true);
			return;
		}
		lastY.current = window.scrollY;
		accumulatedDown.current = 0;
		accumulatedUp.current = 0;

		const handle = throttle(throttleMs, () => {
			const y = window.scrollY;
			const delta = y - lastY.current;
			lastY.current = y;

			if (delta > 0) {
				accumulatedUp.current = 0;
				accumulatedDown.current += delta;
				if (accumulatedDown.current >= offsetDown) {
					setVisible(false);
					accumulatedDown.current = 0;
				}
			} else if (delta < 0) {
				accumulatedDown.current = 0;
				accumulatedUp.current += -delta;
				if (accumulatedUp.current >= offsetUp) {
					setVisible(true);
					accumulatedUp.current = 0;
				}
			}
		});
		window.addEventListener("scroll", handle, { passive: true });
		handle();
		return () => window.removeEventListener("scroll", handle);
	}, [matches, offsetDown, offsetUp, throttleMs]);

	return matches ? visible : true;
}
