import { useCallback, useRef } from "react";
import type { IconRect } from "@/modules/core/icon/shared/model";
import { getPrintNodeRect } from "@/modules/print/shared/lib";
import { isBoxRectEquals } from "@/shared/util";

type IconRecord = Record<string, IconRect>;

type CallbackOptions = {
	id: string;
	icon: string;
};

export type DividerIconPositionsCallback = (
	options: CallbackOptions,
) => (node: HTMLElement) => void;

type Options = {
	ref: React.RefObject<HTMLElement | null>;
	containerWidth: number;
	total: number;
	onRender?: (data: IconRect[]) => void;
};

export function useDividerIconRects({
	ref,
	containerWidth,
	total,
	onRender,
}: Options) {
	const iconRefs = useRef<IconRecord>({});

	const refCallback = useCallback(
		({ icon, id }: CallbackOptions) => {
			return (node: HTMLElement) => {
				if (!node) {
					return;
				}
				if (!ref.current) {
					return;
				}
				if (!iconRefs.current[id]) {
					iconRefs.current[id] = {
						id,
						icon,
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						width: 0,
						height: 0,
					};
				}

				const printRect = getPrintNodeRect({
					node,
					container: ref.current,
					containerWidth,
				});

				if (!printRect) {
					return;
				}

				const isSame = isBoxRectEquals(iconRefs.current[id], printRect);

				if (isSame) {
					return;
				}

				iconRefs.current[id] = { ...printRect, icon, id };

				const iconsCount = Object.keys(iconRefs.current).length;

				if (iconsCount === total) {
					const icons = Object.values(iconRefs.current);
					onRender?.(icons);
				}
			};
		},
		[ref.current, containerWidth, total, onRender],
	);

	return refCallback;
}
