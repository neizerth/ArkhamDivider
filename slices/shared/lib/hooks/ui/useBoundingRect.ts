import { useEffect, useRef, useState } from "react";

/**
 * One shared `ResizeObserver` instead of one per element. A print sheet mounts a
 * `DividerView` per divider, so a run of 300 used to create 300 observer instances that all
 * fired on the same window resize.
 */
type Callback = () => void;

let sharedObserver: ResizeObserver | null = null;
const callbacks = new WeakMap<Element, Callback>();

function getSharedObserver(): ResizeObserver {
	sharedObserver ??= new ResizeObserver((entries) => {
		for (const entry of entries) {
			callbacks.get(entry.target)?.();
		}
	});
	return sharedObserver;
}

function observe(node: Element, callback: Callback): () => void {
	const observer = getSharedObserver();
	callbacks.set(node, callback);
	observer.observe(node);
	return () => {
		callbacks.delete(node);
		observer.unobserve(node);
	};
}

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

		/**
		 * Deliberately still `getBoundingClientRect()` rather than the observer's
		 * `contentRect`: consumers use this box for print geometry — `getRenderScale` divides
		 * `width` by the content width, `usePrintUnitByRect` derives the mm unit from it — and
		 * `contentRect` excludes padding/border and ignores CSS transforms, which `DividerView`
		 * uses for scaling. Swapping the source would silently shift printed output.
		 *
		 * What did change: the size is compared before `setRect`. A `DOMRect` is a fresh object
		 * every call, so the previous unconditional `setRect` re-rendered every observed
		 * component on any resize even when nothing actually moved.
		 */
		const measure = () => {
			const next = node.getBoundingClientRect();
			setRect((prev) =>
				prev && prev.width === next.width && prev.height === next.height
					? prev
					: next,
			);
		};

		measure();
		return observe(node, measure);
	}, [ref]);

	return [ref, rect] as const;
}
