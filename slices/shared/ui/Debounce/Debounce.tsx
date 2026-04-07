import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export type DebounceProps = {
	/** Delay in ms before showing content */
	delay: number;
	children: ReactNode;
	/** Rendered while waiting for the delay (before content is shown) */
	fallback?: ReactNode;
};

export function Debounce({
	delay,
	children,
	fallback = null,
}: DebounceProps): ReactNode {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(false);
		const id = setTimeout(() => setVisible(true), delay);
		return () => clearTimeout(id);
	}, [delay]);

	return visible ? children : fallback;
}
