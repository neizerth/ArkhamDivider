import type { DependencyList } from "react";
import { useEffect, useRef, useState } from "react";

export function useBoundingRect<T extends HTMLElement>(
	defaultRef?: React.RefObject<T | null>,
	effectDeps?: DependencyList,
) {
	const currentRef = useRef<T>(null);
	const ref = defaultRef ?? currentRef;
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
	}, [ref, ...(effectDeps ?? [])]);

	return [ref, rect] as const;
}
