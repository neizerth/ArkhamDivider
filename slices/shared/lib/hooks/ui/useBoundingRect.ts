import { useEffect, useRef, useState } from "react";

export function useBoundingRect<T extends HTMLElement>(
	defaultRef?: React.RefObject<T | null>,
) {
	const currentRef = useRef<T | null>(null);
	const ref = defaultRef ?? currentRef;
	const [rect, setRect] = useState<DOMRect | null>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) {
			return;
		}

		const setBoundingRect = () => setRect(node.getBoundingClientRect());

		setBoundingRect();

		const observer = new ResizeObserver(setBoundingRect);

		observer.observe(node);
		return () => observer.disconnect();
	}, [ref.current]);

	return [ref, rect] as const;
}
