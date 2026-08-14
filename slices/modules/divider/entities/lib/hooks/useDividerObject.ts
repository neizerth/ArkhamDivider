import { useEffect, useRef } from "react";
import {
	selectDividerParam,
	useDividerParam,
} from "@/modules/divider/shared/lib";
import { getPrintNodeRect } from "@/modules/print/shared/lib";
import { selectDividerRenderId } from "@/modules/render/shared/lib";
import { useAppSelector, useBoundingRect } from "@/shared/lib";
import type { BoxRect } from "@/shared/model";
import { isBoxRectEquals } from "@/shared/util";

type Options = {
	dividerId: string;
	containerRef: React.RefObject<HTMLElement | null>;
	param: string;
	containerWidth: number;
};

export const useDividerObject = ({
	dividerId,
	containerRef,
	containerWidth,
	param,
}: Options) => {
	const exportId = useAppSelector(selectDividerRenderId);
	const currentRect = useAppSelector(
		selectDividerParam<BoxRect>({ id: dividerId, key: param }),
	);
	const [ref, rect] = useBoundingRect<HTMLElement>();
	const lastDispatchedRef = useRef<BoxRect | null>(null);

	const setParam = useDividerParam<BoxRect>({ dividerId, key: param });

	useEffect(() => {
		if (!ref.current || !rect || !containerRef.current || exportId) {
			return;
		}

		const printRect = getPrintNodeRect({
			node: ref.current,
			container: containerRef.current,
			containerWidth,
		});

		// If layout metrics are unstable (fonts/container queries/etc),
		// we can end up dispatching the same rect over and over and hit
		// React's maximum update depth. Guard against re-dispatching.
		if (
			lastDispatchedRef.current &&
			isBoxRectEquals(lastDispatchedRef.current, printRect)
		) {
			return;
		}

		if (currentRect && isBoxRectEquals(currentRect, printRect)) {
			return;
		}

		lastDispatchedRef.current = printRect;

		setParam(printRect);
	}, [
		rect,
		ref.current,
		containerRef.current,
		containerWidth,
		currentRect,
		exportId,
		setParam,
	]);

	return ref;
};
