import { useCallback, useEffect, useRef, useState } from "react";

export function useBoundingRect<T extends HTMLElement>(
	defaultRef?: React.RefObject<T | null>,
	measureTrigger?: boolean,
) {
	const currentRef = useRef<T | null>(null);
	const ref = defaultRef ?? currentRef;
	const [rect, setRect] = useState<DOMRect | null>(null);

	const [node, setNode] = useState<T | null>(null);
	const setRefCallback = useCallback(
		(el: T | null) => {
			(ref as React.MutableRefObject<T | null>).current = el;
			setNode(el);
		},
		[ref],
	);

	useEffect(() => {
		const el = measureTrigger !== undefined ? ref.current : node;
		if (!el) {
			return;
		}

		const setBoundingRect = () => setRect(el.getBoundingClientRect());

		setBoundingRect();

		const observer = new ResizeObserver(setBoundingRect);

		observer.observe(el);
		return () => observer.disconnect();
	}, [ref, measureTrigger, node]);

	if (measureTrigger !== undefined) {
		return [ref, rect] as const;
	}
	return [setRefCallback, rect] as const;
}
