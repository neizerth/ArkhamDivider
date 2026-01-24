import { useEffect, useRef, useState } from "react";

export function useBoundingRect<T extends HTMLElement>() {
	const ref = useRef<T>(null);
	const [rect, setRect] = useState<DOMRect | null>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		const node = ref.current;

		const setBoundingRect = () => setRect(node.getBoundingClientRect());

		setBoundingRect();

		const observer = new ResizeObserver(setBoundingRect);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return [ref, rect] as const;
}
